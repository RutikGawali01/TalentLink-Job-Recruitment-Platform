package com.jobportal.DTO;

import com.jobportal.entity.Applicant;
import com.jobportal.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Base64;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicantDTO {

    private Long applicantId;
    private String name;
    private String email;
    private Long phone;
    private String website;
    private String resume;
    private String coverLetter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;

    public Applicant toEntity() {
        return new Applicant(
                applicantId,
                name,
                email,
                phone,
                website,
                resume!=null ? Base64.getDecoder().decode(resume) : null,
                coverLetter,
                timestamp,
                applicationStatus
        );
    }
}
