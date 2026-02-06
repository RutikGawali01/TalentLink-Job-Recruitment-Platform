package com.jobportal.Service;

import com.jobportal.DTO.*;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.JobRepository;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.utility.Utilities;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service("jobService")
public class jobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private NotificationService notificationService;

    //This method creates OR updates a job
    @Override
    @Transactional(rollbackFor = JobPortalException.class)
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        //new job if id  == 0
        if(jobDTO.getId() == null || jobDTO.getId() == 0){
            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());

            // notification created
            //A notification is sent only when a new job is created
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setAction("Job Posted ");
            notificationDTO.setMessage("Job Posted Successfully for "+ jobDTO.getJobTitle()+ "at" + jobDTO.getCompany());
            notificationDTO.setUserId(jobDTO.getPostedBy());
            notificationDTO.setRoute("/posted-jobs/"+jobDTO.getId());
            notificationService.sendNotification(notificationDTO);

        }else { // job already present
            //Ensures job exists before updating
            Job job  = jobRepository.findById(jobDTO.getId()).orElseThrow(()->
                    new JobPortalException("JOB_NOT_FOUND"));

            if(jobDTO.getJobStatus().equals(JobStatus.DRAFT) ||
                    jobDTO.getJobStatus().equals(JobStatus.CLOSED)){
                jobDTO.setPostTime(LocalDateTime.now());
            }

        }

        return jobRepository.save(jobDTO.toEntity()).toDTO();
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
    public void applyJob (ApplicantDTO applicantDTO, Long jobId) throws JobPortalException {
        Job job  = jobRepository.findById(jobId).orElseThrow(()->
                new JobPortalException("JOB_NOT_FOUND"));

        List<Applicant> applicants = job.getApplicants();
        if(applicants == null)applicants = new ArrayList<>();

        boolean alreadyApplied = applicants.stream()
                .anyMatch(a -> a.getApplicantId().equals(applicantDTO.getApplicantId()));

        if(alreadyApplied)
            throw new JobPortalException("JOB_APPLIED_ALREADY");


        if(job.getJobStatus() != JobStatus.ACTIVE)
            throw new JobPortalException("JOB_NOT_OPEN");

        applicantDTO.setApplicantId(
                Utilities.getNextSequence("applicants")
        );

        // notification - job applied successfully
//        NotificationDTO notificationDTO = new NotificationDTO();
//        notificationDTO.setAction("Job Posted ");
//        notificationDTO.setMessage("Job Posted Successfully for "+ jobDTO.getJobTitle()+ "at" + jobDTO.getCompany());
//        notificationDTO.setUserId(jobDTO.getPostedBy());
//        notificationDTO.setRoute("/posted-jobs/"+jobDTO.getId());
//        notificationService.sendNotification(notificationDTO);

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicantDTO.setTimestamp(LocalDateTime.now());
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
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
