package com.jobportal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalyzeResponseDTO {
    private int matchScore;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> recommendations;
}
