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
    private Long jobId;     // reference only

    private Long userId;
    private Long ProfileId;

    private String name;
    private String email;
    private Long phone;
    private String website;// portfolio
    private byte[] resume;
    private String coverLetter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;
    private LocalDateTime interviewTime;

    public ApplicantDTO toDTO() {
        return new ApplicantDTO(
                applicantId,
                jobId,
                userId,
                ProfileId,
                name,
                email,
                phone,
                website,
                resume!=null ? Base64.getEncoder().encodeToString(resume) : null,
                coverLetter,
                timestamp,
                applicationStatus,
                interviewTime
        );
    }


}
