package com.jobportal.entity;

import com.jobportal.DTO.Certification;
import com.jobportal.DTO.Experience;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class Profile {
    private Long id;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private List<String>skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
}
