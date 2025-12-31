package com.jobportal.entity;

import com.jobportal.DTO.ApplicantDTO;
import com.jobportal.DTO.ApplicationStatus;
import com.jobportal.DTO.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Base64;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "applicants")
public class Applicant {
    private Long applicantId;
    private String name;
    private String email;
    private Long phone;
    private String website;
    private byte[] resume;
    private String coverLetter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;

    public ApplicantDTO toDTO() {
        return new ApplicantDTO(
                applicantId,
                name,
                email,
                phone,
                website,
                resume!=null ? Base64.getEncoder().encodeToString(resume) : null,
                coverLetter,
                timestamp,
                applicationStatus
        );
    }


}
