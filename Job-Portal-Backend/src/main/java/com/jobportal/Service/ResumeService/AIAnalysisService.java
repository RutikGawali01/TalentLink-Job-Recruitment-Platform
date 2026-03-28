package com.jobportal.Service.ResumeService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobportal.DTO.AnalyzeResponseDTO;
import com.jobportal.DTO.JobDTO;
import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.ProfileRepository;
import com.jobportal.Service.JobService;
import com.jobportal.Service.ProfileService;
import com.jobportal.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;

@Service
public class AIAnalysisService {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ResumeParserService parserService;

    @Autowired
    private OpenRouterService openRouterService;

    @Autowired
    private JobService jobService;

    @Autowired
    private AnalysisService analysisService;


    public AnalyzeResponseDTO analyze(
            MultipartFile file,
            Long userId,
            Long jobId
    ) throws JobPortalException {

        String resumeText;

        // 🔹 Step 1: Handle Resume
        if (file != null) {

            // 1. Extract text for AI
            resumeText = parserService.parse(file);

            // 2. Convert file → Base64
            String base64Resume;
            try {
                base64Resume = Base64.getEncoder().encodeToString(file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to convert resume");
            }

            // 3. Create ProfileDTO (partial update)
            ProfileDTO dto = new ProfileDTO();
//            dto.setId(userId);  // assuming profileId == userId (confirm this)

            Profile profile = profileRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("PROFILE_NOT_FOUND"));

            dto.setId(profile.getId());


            dto.setResume(base64Resume);
            dto.setResumeName(file.getOriginalFilename());
            dto.setResumeUploadDate(LocalDate.now().toString());

            // 4. Call existing update method
            profileService.updateProfile(dto);

        } else {

            Profile profile = profileRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("PROFILE_NOT_FOUND"));


            ProfileDTO profileDTO = profileService.getProfile(profile.getId());

            if (profileDTO.getResume() == null) {
                throw new RuntimeException("No resume found");
            }

            byte[] resumeBytes = Base64.getDecoder().decode(profileDTO.getResume());




            // Convert to text
            resumeText = parserService.parseFromBytes(resumeBytes);
        }

        // 🔹 Step 2: Get Job Description
        JobDTO job = jobService.getJob(jobId);
        String jobDesc = job.getDescription();

        // 🔹 Step 3: Build Prompt
        String prompt = buildPrompt(resumeText, jobDesc);

        // 🔹 Step 4: Call AI
        String aiResponse = openRouterService.callAIForAnalysis(prompt);

        // 🔹 Step 5: Convert JSON → DTO
        System.out.println("AI RAW RESPONSE: " + aiResponse);
        AnalyzeResponseDTO result = parseResponse(aiResponse);
        analysisService.saveAnalysis(userId, jobId, result);
        return result;
    }


    // Prompt builder
    private String buildPrompt(String resume, String job) {
        return """
        Compare resume and job description.

        Resume:
        %s

        Job Description:
        %s

        Return JSON:
        {
          "matchScore": number,
          "matchedSkills": [],
          "missingSkills": [],
          "recommendations": []
        }
        """.formatted(resume, job);
    }

    // JSON parsing
    private AnalyzeResponseDTO parseResponse(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(json, AnalyzeResponseDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response");
        }
    }
}