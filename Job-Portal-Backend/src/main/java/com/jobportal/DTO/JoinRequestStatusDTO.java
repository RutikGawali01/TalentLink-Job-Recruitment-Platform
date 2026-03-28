package com.jobportal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class JoinRequestStatusDTO {
    private String status;
    private Long companyId;
}
