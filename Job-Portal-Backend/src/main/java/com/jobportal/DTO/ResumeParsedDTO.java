package com.jobportal.DTO;

import lombok.Data;

import java.util.List;

@Data
public class ResumeParsedDTO {

    private String name;
    private String email;
    private String location;
    private String headline;

    private List<String> skills;

    private List<Education> educations;
    private List<Experience> experiences;

    private Long totalExp;
}