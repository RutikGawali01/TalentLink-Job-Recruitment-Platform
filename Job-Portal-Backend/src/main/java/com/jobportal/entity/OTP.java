package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.AccessType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "OTP")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OTP {
    @Id
    private String email;
    private String otpCode;
    private LocalDateTime creationTime;
}
