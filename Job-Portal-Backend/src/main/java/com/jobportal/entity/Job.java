package com.jobportal.entity;


import com.jobportal.DTO.JobDTO;
import com.jobportal.DTO.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "Jobs")
@AllArgsConstructor
@NoArgsConstructor
public class Job {

    @Id
    private Long id;
    private String jobTitle;
    private String company;
    private List<Applicant> applicants;
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

    public JobDTO toDTO() {
        return new JobDTO(
                id,
                jobTitle,
                company,
                applicants != null ? applicants.stream().map((x)-> x.toDTO()).toList():null,
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

