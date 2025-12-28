package com.jobportal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Certification {
    private String name;
    private String issuer;
    private LocalDateTime issueDate;
    private String certificateId;
}
