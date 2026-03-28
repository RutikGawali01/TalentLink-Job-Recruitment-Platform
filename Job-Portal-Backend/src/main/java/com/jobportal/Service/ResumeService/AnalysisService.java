package com.jobportal.Service.ResumeService;

import com.jobportal.DTO.AnalyzeResponseDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.AnalysisRepository;
import com.jobportal.entity.Analysis;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AnalysisService {

    @Autowired
    private AnalysisRepository analysisRepository;

    // Save or update
    public void saveAnalysis(Long userId, Long jobId, AnalyzeResponseDTO dto) throws JobPortalException {

        Analysis analysis = analysisRepository
                .findByUserIdAndJobId(userId, jobId)
                .orElse(null);

        // 🔥 If NOT exists → create new + generate ID
        if (analysis == null) {
            analysis = new Analysis();
            analysis.setId(Utilities.getNextSequence("analysis")); // ✅ HERE
        }

        analysis.setUserId(userId);
        analysis.setJobId(jobId);

        analysis.setMatchScore(dto.getMatchScore());
        analysis.setMatchedSkills(dto.getMatchedSkills());
        analysis.setMissingSkills(dto.getMissingSkills());
        analysis.setRecommendations(dto.getRecommendations());

        analysis.setCreatedAt(LocalDateTime.now());

        analysisRepository.save(analysis);
    }

    // Get existing
    public AnalyzeResponseDTO getAnalysis(Long userId, Long jobId) {

        Analysis analysis = analysisRepository
                .findByUserIdAndJobId(userId, jobId)
                .orElse(null);

        if (analysis == null) return null;

        AnalyzeResponseDTO dto = new AnalyzeResponseDTO();
        dto.setMatchScore(analysis.getMatchScore());
        dto.setMatchedSkills(analysis.getMatchedSkills());
        dto.setMissingSkills(analysis.getMissingSkills());
        dto.setRecommendations(analysis.getRecommendations());

        return dto;
    }
}
