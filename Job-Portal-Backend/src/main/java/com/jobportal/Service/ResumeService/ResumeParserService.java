package com.jobportal.Service.ResumeService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobportal.DTO.ResumeAnalysisResponse;
import com.jobportal.DTO.ResumeParsedDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeParserService {

    private final ResumeTextExtractor extractor;
    private final OpenRouterService openRouterService;
    private final ObjectMapper objectMapper;


    public ResumeParsedDTO parseResume(MultipartFile file) {

        try {

            // 1️⃣ Extract resume text
            String resumeText = extractor.extractText(file);

            // 2️⃣ Send to OpenRouter AI
            String aiResponseJson = openRouterService.parseResume(resumeText);

            // 3️⃣ Clean markdown
            aiResponseJson = aiResponseJson
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            // 4️⃣ Extract valid JSON
            int start = aiResponseJson.indexOf("{");
            int end = aiResponseJson.lastIndexOf("}");

            if (start != -1 && end != -1) {
                aiResponseJson = aiResponseJson.substring(start, end + 1);
            }

            log.info("Clean JSON from AI: {}", aiResponseJson);

            // 5️⃣ Convert to DTO
            return objectMapper.readValue(aiResponseJson, ResumeParsedDTO.class);

        } catch (Exception e) {

            log.error("Resume parsing failed", e);
            throw new RuntimeException("Failed to parse resume using AI", e);
        }
    }


    public ResumeAnalysisResponse parseResponse(String response) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            JsonNode root = mapper.readTree(response);

            String content = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            // 🔥 CLEAN JSON STRING
            String cleanJson = cleanJson(content);

            return mapper.readValue(cleanJson, ResumeAnalysisResponse.class);

        } catch (Exception e) {
            System.out.println("Parsing Error: " + e.getMessage());
            throw new RuntimeException("AI parsing failed");
        }
    }

    private String cleanJson(String content) {
        return content
                .replace("```json", "")
                .replace("```", "")
                .replace("\\n", "")
                .replace("\\", "")
                .trim();
    }

    public String parse(MultipartFile file) {
        return extractor.extract(file);
    }

    public String parseFromBytes(byte[] bytes) {
        return extractor.extractFromBytes(bytes);
    }
}