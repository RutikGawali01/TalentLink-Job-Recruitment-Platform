package com.jobportal.entity;

import com.jobportal.DTO.CompanyDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.Base64;


@Document("companies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Company {

    @Id
    private Long id;

    @Indexed(unique = true)
    private String name;

    @Indexed(unique = true)
    private String email;

    private String tagline;

    private String industry;
    private String location;
    private String about;

    private String companyType;
    private String companySize;
    private String workModel;

    @Indexed(unique = true)
    private String website;

    private Integer foundedYear;
    private byte[] logo;

    private Long employerId;

    private boolean profileCompleted;
    private boolean verified;


    public CompanyDTO toDTO() {
        return new CompanyDTO(
                id,
                name,
                email,
                tagline,
                industry,
                location,
                about,
                companyType,
                companySize,
                workModel,
                website,
                foundedYear,
                logo != null ? Base64.getEncoder().encodeToString(logo) : null,
                employerId,
                profileCompleted,
                verified
        );
    }

}
