package com.jobportal.Service.ResumeService;

import com.jobportal.DTO.Message;
import com.jobportal.DTO.OpenAIRequest;
import com.jobportal.DTO.OpenAIResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final WebClient webClient =
            WebClient.builder()
                    .baseUrl("https://api.groq.com/openai/v1/chat/completions")
                    .build();

    public String parseResume(String resumeText){

        if(resumeText.length() > 6000){
            resumeText = resumeText.substring(0,6000);
        }

        String prompt = """
        Extract the following information from the resume.
        
        Return ONLY valid JSON.
        
        Rules:
        - totalExp must be a NUMBER only
        - totalExp represents total experience in months
        - Do not include words like months or years
        - Do not include explanations
        
        JSON format:
        {
          "name": "",
          "email": "",
          "location": "",
          "skills": [],
          "totalExp": 0
        }
        Resume:
        """ + resumeText;

        Message system = new Message(
                "system",
                "You are an expert resume parser."
        );

        Message user = new Message(
                "user",
                prompt
        );

        OpenAIRequest request = new OpenAIRequest();
        request.setModel("llama-3.1-8b-instant");
        request.setMessages(List.of(system,user));

        OpenAIResponse response = webClient.post()
                .header("Authorization","Bearer " + apiKey)
                .header("Content-Type","application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(OpenAIResponse.class)
                .block();

        System.out.println("AI RESPONSE: " + response);

        return response.getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}