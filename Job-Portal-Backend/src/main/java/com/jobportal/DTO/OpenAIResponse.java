package com.jobportal.DTO;

import lombok.Data;

import java.util.List;

@Data
public class OpenAIResponse {

    private List<Choice> choices;

}