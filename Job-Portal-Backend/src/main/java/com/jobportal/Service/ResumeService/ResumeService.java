package com.jobportal.Service.ResumeService;

import com.jobportal.DTO.ResumeAnalysisResponse;
import com.jobportal.DTO.ResumeParsedDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.ProfileRepository;
import com.jobportal.Repository.ResumeAnalysisRepository;
import com.jobportal.entity.Profile;
import com.jobportal.entity.ResumeAnalysis;
import com.jobportal.utility.Utilities;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeParserService parserService;
    private final ProfileRepository profileRepository;
    private final ResumeTextExtractor resumeTextExtractor;
    private  final OpenRouterService openRouterService;

    private  final ResumeParserService resumeParserService;

    private  final ResumeAnalysisRepository resumeAnalysisRepository;

    public Profile processResume(MultipartFile file, Long userId)
            throws IOException, JobPortalException {

        ResumeParsedDTO data =
                parserService.parseResume(file);

        Optional<Profile> existing = profileRepository.findByUserId(userId);

        Profile profile;

        if(existing.isPresent()){
            profile = existing.get();
        }else{
            profile = new Profile();
            profile.setId(Utilities.getNextSequence("profiles"));
        }

        profile.setUserId(userId);

        profile.setName(data.getName());
        profile.setEmail(data.getEmail());
        profile.setLocation(data.getLocation());
        profile.setHeadline(data.getHeadline());

        profile.setSkills(data.getSkills());
        profile.setTotalExp(data.getTotalExp());

        profile.setResume(file.getBytes());
        profile.setResumeName(file.getOriginalFilename());
        profile.setResumeUploadDate(LocalDate.now().toString());

        profile.setResumeUploaded(true);

        return profileRepository.save(profile);
    }


    public ResumeAnalysisResponse analyzeResume(Long userId, String base64Resume) throws JobPortalException {

        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        String currentUploadDate = profile.getResumeUploadDate();

        // 2. Check existing analysis
        Optional<ResumeAnalysis> existing =
                resumeAnalysisRepository.findByUserId(userId);

        if (existing.isPresent() &&
                existing.get().getResumeUploadDate().equals(currentUploadDate)) {

            return mapToResponse(existing.get()); // 🔥 reuse old result
        }


// 3. Clean base64
        if (base64Resume.contains(",")) {
            base64Resume = base64Resume.split(",")[1];
        }

        // 4. Decode
        byte[] fileBytes = Base64.getDecoder().decode(base64Resume);

        // 5. Extract text (Tika)
        String resumeText = resumeTextExtractor.extractTextWithTika(fileBytes);

        // 6. Build prompt + call AI
        String aiResponse = openRouterService.callAI(buildPrompt(resumeText));

        ResumeAnalysisResponse parsed =
                resumeParserService.parseResponse(aiResponse);

        // 7. Save / Update analysis
        ResumeAnalysis analysis = existing.orElse(new ResumeAnalysis());

        if (analysis.getId() == null) {
            analysis.setId(Utilities.getNextSequence("ResumeAnalysis")); // ✅ your logic
        }
        analysis.setUserId(userId);
        analysis.setScore(parsed.getScore());
        analysis.setSuggestions(parsed.getSuggestions());
        analysis.setResumeUploadDate(currentUploadDate);
        analysis.setCreatedAt(LocalDateTime.now().toString());

        resumeAnalysisRepository.save(analysis);

        return parsed;
    }


    private ResumeAnalysisResponse mapToResponse(ResumeAnalysis analysis) {
        ResumeAnalysisResponse response = new ResumeAnalysisResponse();
        response.setScore(analysis.getScore());
        response.setSuggestions(analysis.getSuggestions());
        return response;
    }

    private String buildPrompt(String resumeText) {
        return """
You are an expert resume reviewer.

Return ONLY valid JSON. No text, no explanation.

Format:
{
  "score": number,
  "suggestions": ["", "", ""]
}

Rules:
- Score between 0-100
- Suggestions short and actionable

Resume:
""" + resumeText;
    }

}
