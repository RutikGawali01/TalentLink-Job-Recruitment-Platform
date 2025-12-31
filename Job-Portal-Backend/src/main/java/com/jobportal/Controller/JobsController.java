package com.jobportal.Controller;

import com.jobportal.DTO.*;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin
@Validated
public class JobsController {
    @Autowired
    private JobService jobService;

    @PostMapping("/post")
    public ResponseEntity<JobDTO> postJob(@RequestBody @Valid JobDTO jobDTO) throws JobPortalException {

        return new ResponseEntity<>(jobService.postJob(jobDTO), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<JobDTO>> getAllJobs() throws Exception{

        return new ResponseEntity<>( jobService.getAllJobs(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<JobDTO> getJob(@PathVariable Long id) throws Exception{

        return new ResponseEntity<>( jobService.getJob(id), HttpStatus.OK);
    }

    @PostMapping("/apply/{id}")
    public ResponseEntity<ResponseDTO> applyJob(@RequestBody ApplicantDTO applicantDTO, @PathVariable Long id) throws JobPortalException {
        jobService.applyJob(applicantDTO, id);
        return new ResponseEntity<>(new ResponseDTO("Applied Successfully!"), HttpStatus.OK);
    }


}
