package com.jobportal.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponse {
    private final String jwt;//JWT should never change once created\

    private String accountType;
    private Long profileId;
    private Long companyId;
    private Integer onboardingStep;
    private String status;

    private boolean profileCompleted;
    private boolean resumeUploaded;


}
