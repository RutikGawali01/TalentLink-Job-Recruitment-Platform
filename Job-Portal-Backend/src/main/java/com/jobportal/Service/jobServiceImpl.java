package com.jobportal.Service;

import com.jobportal.DTO.JobDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.JobRepository;
import com.jobportal.entity.Job;
import com.jobportal.utility.Utilities;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        Job job = modelMapper.map(jobDTO, Job.class);
        job = jobRepository.save(job);

        return modelMapper.map(job, JobDTO.class);
    }

    @Override
    public List<JobDTO> getAllJobs() throws JobPortalException {
        return jobRepository.findAll()
                .stream()
                .map((x)-> modelMapper.map(x, JobDTO.class))
                .toList();
    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
        Job job  = jobRepository.findById(id).orElseThrow(()->
                new JobPortalException("JOB_NOT_FOUND"));

        return  modelMapper.map(job, JobDTO.class);
    }
}
