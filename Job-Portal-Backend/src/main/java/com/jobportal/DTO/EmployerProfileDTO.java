package com.jobportal.DTO;

import com.jobportal.entity.EmployerProfile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployerProfileDTO {

    private Long id;


    private String fullName;
    private String email;
    private EmployerRoles role; // HR / Founder / Hiring Manager
    private String phone;
    private String profilePicture;
    private Long companyId;

    private String banner;

    private boolean profileCompleted;


    public EmployerProfile toEntity() {
        return new EmployerProfile(
                id,
                fullName,
                email,
                role,
                phone,
                profilePicture != null ? Base64.getDecoder().decode(profilePicture) : null,
                companyId,
                banner != null ? Base64.getDecoder().decode(banner) : null,
                profileCompleted
        );

    }
}
