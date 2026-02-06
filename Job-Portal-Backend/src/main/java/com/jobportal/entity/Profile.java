package com.jobportal.entity;

import com.jobportal.DTO.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class Profile {

    @Id
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;

    private byte[] picture;    // Stored in DB as byte[]
    private Long totalExp;

    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
    private List<Education> educations;

    private List<Long> savedJobs;
    private Portfolio portfolio;

    private Boolean profileCompleted = false;


    public ProfileDTO toDTO() {
        return new ProfileDTO(
                id,
                name,
                email,
                jobTitle,
                company,
                location,
                about,
                picture!=null ? Base64.getEncoder().encodeToString(picture) : null,
                totalExp,
                skills,
                experiences,
                certifications,
                educations,
                savedJobs,
                portfolio,
                profileCompleted
        );
    }
}
