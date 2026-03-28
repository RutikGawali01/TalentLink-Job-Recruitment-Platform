package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "analysis")
public class Analysis {

    @Id
    private Long id;

    private Long userId;
    private Long jobId;

    private int matchScore;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> recommendations;

    private LocalDateTime createdAt;
}