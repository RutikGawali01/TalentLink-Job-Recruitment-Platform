package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "resume_analysis")
public class ResumeAnalysis {

    @Id
    private Long id;

    private Long userId;

    private int score;

    private List<String> suggestions;

    private String resumeUploadDate;
    private String createdAt;

    // getters & setters
}