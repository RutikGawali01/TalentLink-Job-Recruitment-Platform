package com.jobportal.Service;

import com.jobportal.DTO.JobDTO;
import com.jobportal.Exception.JobPortalException;

import java.util.List;

public interface JobService {

    public JobDTO postJob( JobDTO jobDTO) throws JobPortalException;

    public List<JobDTO> getAllJobs() throws  JobPortalException;

    public JobDTO getJob(Long id) throws JobPortalException;
}
