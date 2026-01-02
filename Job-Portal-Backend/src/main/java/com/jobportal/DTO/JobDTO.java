package com.jobportal.DTO;

import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {

    private Long id;
    private String jobTitle;
    private String company;
    private List<ApplicantDTO> applicants;
    private String about;
    private String experience;
    private String  jobType;
    private String location;
    private Long packageOffered;
    private LocalDateTime postTime;
    private String description;
    private List<String> skillsRequired;
    private JobStatus jobStatus;
    private Long postedBy;

    public Job toEntity() {
        return new Job(
                id,
                jobTitle,
                company,
                applicants != null ? applicants.stream().map((x)-> x.toEntity()).toList():null,
                about,
                experience,
                jobType,
                location,
                packageOffered,
                postTime,
                description,
                skillsRequired,
                jobStatus,
                postedBy

        );
    }



}
