package com.jobportal.DTO;


import lombok.Data;

@Data
public class ApproveRequestDTO {

    private Long requestId;

    private boolean approve;
}