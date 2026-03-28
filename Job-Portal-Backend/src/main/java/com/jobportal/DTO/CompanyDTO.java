package com.jobportal.DTO;

import com.jobportal.entity.Company;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDTO {
    private Long id;

    private String name;
    private String email;
    private String tagline;

    private String industry;
    private String location;
    private String about;

    private String companyType;
    private String companySize;
    private String workModel;

    private String website;
    private  String domain;

    private Integer foundedYear;
    private String logo;

    private Long employerId;

    private boolean profileCompleted;
    private boolean verified;

    private LocalDateTime created_at;

    public Company toEntity() {
        return new Company(
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
                domain,
                foundedYear,
                logo != null ? Base64.getDecoder().decode(logo) : null,
                employerId,
                profileCompleted,
                verified,
                created_at
        );

    }
}
