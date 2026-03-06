package com.jobportal.Service;

import com.jobportal.DTO.*;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.JobRepository;
import com.jobportal.Repository.ProfileRepository;
import com.jobportal.Repository.UserRepository;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.entity.Profile;
import com.jobportal.entity.User;
import com.jobportal.utility.Utilities;
import com.jobportal.jwt.CustomUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service("jobService")
public class jobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    //This method creates OR updates a job
    @Override
    @Transactional(rollbackFor = JobPortalException.class)
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {

        boolean isNewJob = (jobDTO.getId() == null || jobDTO.getId() == 0);

        if (isNewJob) {

            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());

            // ---------- Notification ----------
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setAction("Job Posted");
            notificationDTO.setMessage(
                    "Job Posted Successfully for " +
                            jobDTO.getJobTitle() + " at " +
                            jobDTO.getCompany()
            );
            notificationDTO.setUserId(jobDTO.getPostedBy());
            notificationDTO.setRoute("/posted-jobs/" + jobDTO.getId());

            notificationService.sendNotification(notificationDTO);

        } else {

            Job job = jobRepository.findById(jobDTO.getId())
                    .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));

            if (jobDTO.getJobStatus() == JobStatus.DRAFT ||
                    jobDTO.getJobStatus() == JobStatus.CLOSED) {

                jobDTO.setPostTime(LocalDateTime.now());
            }
        }

        // ---------- SAVE JOB ----------
        Job savedJob = jobRepository.save(jobDTO.toEntity());

        // =====================================================
        // 🔥 ONBOARDING STEP UPDATE (ONLY FIRST JOB)
        // =====================================================

        if (isNewJob) {

            User user = userRepository.findById(jobDTO.getPostedBy())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (user.getAccountType() == AccountType.EMPLOYER &&
                    user.getOnboardingStep() != null &&
                    user.getOnboardingStep() == 3) {

                user.setOnboardingStep(4);   // STEP 4 → COMPLETED
                userRepository.save(user);
            }
        }

        return savedJob.toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() throws JobPortalException {
        return jobRepository.findAll()
                .stream()
                .map((x)-> x.toDTO())
                .toList();
    }

    @Override
    public JobDTO getJob(Long jobId) throws JobPortalException {
        Job job  = jobRepository.findById(jobId).orElseThrow(()->
                new JobPortalException("JOB_NOT_FOUND"));

        return job.toDTO();
    }

    @Override
    @Transactional(rollbackFor = JobPortalException.class)
    public void applyJob(ApplicantDTO applicantDTO, Long jobId) throws JobPortalException {

        // ================= FIND JOB =================
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));

        List<Applicant> applicants = job.getApplicants();
        if (applicants == null) applicants = new ArrayList<>();

        // ================= GET LOGGED USER =================
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
            throw new JobPortalException("USER_NOT_AUTHENTICATED");
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long loggedUserId = userDetails.getId();

        // ================= PREVENT APPLY TO OWN JOB =================
        if (job.getPostedBy().equals(loggedUserId)) {
            throw new JobPortalException("CANNOT_APPLY_OWN_JOB");
        }

        // ================= CHECK ALREADY APPLIED =================
        boolean alreadyApplied = applicants.stream()
                .anyMatch(a -> Objects.equals(a.getUserId(), loggedUserId));

        if (alreadyApplied) {
            throw new JobPortalException("JOB_APPLIED_ALREADY");
        }

        // ================= JOB MUST BE ACTIVE =================
        if (job.getJobStatus() != JobStatus.ACTIVE) {
            throw new JobPortalException("JOB_NOT_OPEN");
        }

        // ================= GET USER PROFILE =================
        Profile profile = profileRepository.findByUserId(loggedUserId).orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

        // ================= SET APPLICANT DATA =================
        applicantDTO.setApplicantId(Utilities.getNextSequence("applicants")); // let DB generate application id
        applicantDTO.setJobId(jobId);

        applicantDTO.setUserId(loggedUserId);        // 🔥 main identity
        applicantDTO.setProfileId(profile.getId());  // 🔥 direct profile mapping

        applicantDTO.setName(profile.getName());
        applicantDTO.setEmail(profile.getEmail());
        ///applicantDTO.setPhone(profile.getPhone());
//        applicantDTO.setWebsite(profile.getWebsite());
//        applicantDTO.setResume(profile.getResume());

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicantDTO.setTimestamp(LocalDateTime.now());

        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);

        jobRepository.save(job);

        // ================= SEND NOTIFICATION =================
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setAction("Job Applied");
        notificationDTO.setMessage("You applied successfully for " + job.getJobTitle());
        notificationDTO.setUserId(loggedUserId);
        notificationDTO.setRoute("/job-history");

        try {
            notificationService.sendNotification(notificationDTO);
        } catch (Exception e) {
            log.warn("Notification failed but application saved", e);
        }
    }

    @Override
    public List<JobDTO> getsJobsPostedBy(Long id) {
        // id  --> userId of recruiter / employer
        return jobRepository.findByPostedBy(id)
                .stream()
                .map((x)-> x.toDTO())
                .toList();
    }

    @Override
    public void changeAppliStatus(Application application) throws JobPortalException {

        // 1️⃣ Fetch job using JOB ID
        Job job = jobRepository.findById(application.getJobId())
                .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));

        List<Applicant> applicants = job.getApplicants();
        if (applicants == null || applicants.isEmpty()) {
            throw new JobPortalException("NO_APPLICANTS_FOUND");
        }

        boolean applicantFound = false;

        // 2️⃣ Update applicant status
        for (Applicant applicant : applicants) {

            if (application.getApplicantId().equals(applicant.getApplicantId())) {

                applicant.setApplicationStatus(application.getApplicationStatus());

                if (application.getApplicationStatus() == ApplicationStatus.INTERVIEWING) {
                    applicant.setInterviewTime(application.getInterviewTime());
                    sendInterviewNotification(application);
                }

                applicantFound = true;
                break; // no need to iterate further
            }
        }

        if (!applicantFound) {
            throw new JobPortalException("APPLICANT_NOT_FOUND");
        }

        // 3️⃣ Save updated job document
        jobRepository.save(job);
    }

    private void sendInterviewNotification(Application application) {

        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setAction("Interview Scheduled");
        notificationDTO.setMessage(
                "Interview scheduled for Job ID: " + application.getJobId()
        );
        notificationDTO.setUserId(application.getApplicantId());
        notificationDTO.setRoute("/job-history");

        try {
            notificationService.sendNotification(notificationDTO);
        } catch (JobPortalException e) {
            log.error(
                    "Failed to send interview notification for applicant {}",
                    application.getApplicantId(),
                    e
            );
        }
    }



}
