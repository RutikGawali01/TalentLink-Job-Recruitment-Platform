package com.jobportal.Controller;

import com.jobportal.DTO.AnalyzeResponseDTO;
import com.jobportal.DTO.ResumeAnalysisRequest;
import com.jobportal.DTO.ResumeAnalysisResponse;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Service.ResumeService.AIAnalysisService;
import com.jobportal.Service.ResumeService.AnalysisService;
import com.jobportal.Service.ResumeService.ResumeService;
import com.jobportal.entity.Profile;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@Tag(name = "AI Resume APIs")
public class ResumeController {
    private final ResumeService resumeService;

    @Autowired
    private AIAnalysisService aiAnalysisService;

    @Autowired
    private AnalysisService analysisService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam MultipartFile file,
            @RequestParam Long userId) throws IOException, JobPortalException {

        Profile profile =
                resumeService.processResume(file, userId);

        return ResponseEntity.ok(profile);
    }

    @PostMapping("/analyze/{userId}")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume(
            @PathVariable Long userId,
            @RequestBody ResumeAnalysisRequest request) throws JobPortalException {

        return ResponseEntity.ok(
                resumeService.analyzeResume(userId, request.getResumeBase64())
        );
    }

    @PostMapping("/analyze-with-job")
    public ResponseEntity<?> analyzeResume(
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) Long userId,
            @RequestParam Long jobId
    ) throws JobPortalException {

        AnalyzeResponseDTO response = aiAnalysisService.analyze(file, userId, jobId);

        return ResponseEntity.ok(response);
    }

//    Get existing analysis for resume and job desccription comparison
    @GetMapping("/analysis")
    public ResponseEntity<?> getAnalysis(
            @RequestParam Long userId,
            @RequestParam Long jobId
    ) {
        AnalyzeResponseDTO response = analysisService.getAnalysis(userId, jobId);

        return ResponseEntity.ok(response);
    }

}
