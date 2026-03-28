package com.jobportal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpenAIRequest {

    private String model;
    private List<Message> messages;
    private Map<String, String> response_format;

}
