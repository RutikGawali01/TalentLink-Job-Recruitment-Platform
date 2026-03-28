package com.jobportal.entity;

import com.jobportal.DTO.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Base64;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Employer_Profile")
public class EmployerProfile {

    @Id
    private Long id;

    private Long userId;

    private String fullName;
    private String email;
    private EmployerRoles role; // HR / Founder / Hiring Manager
    private String phone;
    private byte[] profilePicture;
    private Long companyId;

    private byte[] banner;

    private boolean profileCompleted;


    // ✅ Entity → DTO
    public EmployerProfileDTO toDTO() {
        return new EmployerProfileDTO(
                id,
                userId,
                fullName,
                email,
                role,
                phone,
                profilePicture != null ? Base64.getEncoder().encodeToString(profilePicture) : null,
                companyId,
                banner != null ? Base64.getEncoder().encodeToString(banner) : null,
                profileCompleted
        );
    }
}
