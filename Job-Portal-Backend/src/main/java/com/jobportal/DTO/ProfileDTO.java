package com.jobportal.DTO;

import com.jobportal.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Base64;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {

    private Long id;
    private  String name;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;

    private String picture;    // Base64 String from UI
    private Long totalExp;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
    private List<Education> educations;
    private List<Long> savedJobs;
    private Portfolio portfolio;

    private Boolean profileCompleted = false;

    // Convert DTO → Entity
    public Profile toEntity() {
        return new Profile(
                id,
                name,
                email,
                jobTitle,
                company,
                location,
                about,
                picture!=null ? Base64.getDecoder().decode(picture) : null,
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
