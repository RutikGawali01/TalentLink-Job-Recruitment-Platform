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

    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
    private List<Long> savedJobs;

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
                skills,
                experiences,
                certifications,
                savedJobs
        );
    }
}
