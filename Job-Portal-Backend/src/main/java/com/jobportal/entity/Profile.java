package com.jobportal.entity;

import com.jobportal.DTO.Certification;
import com.jobportal.DTO.Experience;
import com.jobportal.DTO.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Document(collection = "profiles")
// particular users profile schema
public class Profile {
    private Long id;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private byte[] picture;

    private List<String>skills;
    private List<Experience> experiences;
    private List<Certification> certifications;



//
//    public ProfileDTO toDTO(){
//        return new Profile(
//                this.id, this.email, this.jobTitle, this.company, this.location, this.about,
//                this.picture!= null? Base64.getDecoder().decode(this.picture):null, this.skills,
//                this.experiences, this.certifications,
//                );
//    }
}
