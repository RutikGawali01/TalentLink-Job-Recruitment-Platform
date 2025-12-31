package com.jobportal.Service;

import com.jobportal.DTO.ApplicantDTO;
import com.jobportal.DTO.ApplicationStatus;
import com.jobportal.DTO.JobDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.JobRepository;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.utility.Utilities;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service("jobService")
public class jobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        jobDTO.setId(Utilities.getNextSequence("jobs"));
        jobDTO.setPostTime(LocalDateTime.now());
        Job job = jobDTO.toEntity();
        job = jobRepository.save(job);

        return job.toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() throws JobPortalException {
        return jobRepository.findAll()
                .stream()
                .map((x)-> x.toDTO())
                .toList();
    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
        Job job  = jobRepository.findById(id).orElseThrow(()->
                new JobPortalException("JOB_NOT_FOUND"));

        return job.toDTO();
    }

    @Override
    public void applyJob(ApplicantDTO applicantDTO, Long id) throws JobPortalException {
        Job job  = jobRepository.findById(id).orElseThrow(()->
                new JobPortalException("JOB_NOT_FOUND"));

        List<Applicant> applicants = job.getApplicants();
        if(applicants == null)applicants = new ArrayList<>();
        if(applicants.stream()
                .filter((x)->
                        x.getApplicantId()== applicantDTO.getApplicantId())
                .toList().size()> 0) throw  new JobPortalException("JOB_APPLIED_ALREADY");

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }
}
