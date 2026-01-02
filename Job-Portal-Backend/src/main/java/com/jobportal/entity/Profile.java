package com.jobportal.entity;

import com.jobportal.DTO.Certification;
import com.jobportal.DTO.Experience;
import com.jobportal.DTO.ProfileDTO;
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

    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;

    private List<Long> savedJobs;

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
                skills,
                experiences,
                certifications,
                savedJobs
        );
    }
}
