package com.jobportal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ProfileCompletionDTO {
    private boolean profileCompleted;
    private int completionPercentage;
    private List<String> missingFields;
}

