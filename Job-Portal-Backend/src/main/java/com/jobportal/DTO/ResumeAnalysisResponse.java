package com.jobportal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class ResumeAnalysisResponse {
    private int score;
    private List<String> suggestions;
}
