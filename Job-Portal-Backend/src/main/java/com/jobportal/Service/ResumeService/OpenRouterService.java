package com.jobportal.Service.ResumeService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenRouterService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.api.url}")
    private String apiUrl;



    public String callAI(String prompt) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders  headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("HTTP-Referer", "http://localhost:3000");
        headers.set("X-Title", "Job Portal AI");

        Map<String, Object> body = new HashMap<>();
        body.put("model", "anthropic/claude-3-haiku");
        body.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                apiUrl,
                request,
                String.class
        );

        return response.getBody();
    }


    public String callAIForAnalysis(String prompt){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("HTTP-Referer", "http://localhost:3000");
        headers.set("X-Title", "Job Portal AI");

        Map<String, Object> body = new HashMap<>();
        body.put("model", "anthropic/claude-3-haiku");

        body.put("messages", List.of(
                Map.of("role", "system", "content", "You are a strict JSON generator."),
                Map.of("role", "user", "content", prompt)
        ));

        body.put("temperature", 0.2);
        body.put("max_tokens", 500);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                apiUrl,
                request,
                String.class
        );

        return extractAndClean(response.getBody());
    }


    private String extractAndClean(String responseBody) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseBody);

            String content = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            int start = content.indexOf("{");
            int end = content.lastIndexOf("}");

            return content.substring(start, end + 1);

        } catch (Exception e) {
            throw new RuntimeException("AI parsing failed");
        }
    }

}

