package com.jobportal.DTO;

import com.jobportal.entity.Company;
import com.jobportal.entity.EmployerProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDTO {
    private String id;

    private String name;
    private String tagline;

    private String industry;
    private String location;
    private String about;

    private String companyType;
    private String companySize;
    private String workModel;

    private String website;
    private Integer foundedYear;
    private String logo;

    private Long EmployerId;

    private boolean profileCompleted;
    private boolean verified;

    public Company toEntity() {
        return new Company(
                id,
                name,
                tagline,
                industry,
                location,
                about,
                companyType,
                companySize,
                workModel,
                website,
                foundedYear,
                logo != null ? Base64.getDecoder().decode(logo) : null,
                EmployerId,
                profileCompleted,
                verified
        );

    }
}
