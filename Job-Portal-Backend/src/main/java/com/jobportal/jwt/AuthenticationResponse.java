package com.jobportal.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class AuthenticationResponse {
    private final String jwt;//JWT should never change once created\

    private String accountType;
    private Long profileId;
    private boolean profileCompleted;
    private Long companyId;
    private Integer onboardingStep;


}
