package com.jobportal.Service;

import com.jobportal.DTO.ApplicantDTO;
import com.jobportal.DTO.Application;
import com.jobportal.DTO.JobDTO;
import com.jobportal.Exception.JobPortalException;

import java.util.List;

public interface JobService {

    public JobDTO postJob( JobDTO jobDTO) throws JobPortalException;

    public List<JobDTO> getAllJobs() throws  JobPortalException;

    public JobDTO getJob(Long id) throws JobPortalException;

    public void applyJob(ApplicantDTO applicantDTO, Long id) throws JobPortalException;

    public List<JobDTO>  getsJobsPostedBy(Long id);

    public void changeAppliStatus(Application application) throws JobPortalException;
}
