package com.jobportal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Education {
    private String degree;
    private String institution;
    private Double  cgpa;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;

}
