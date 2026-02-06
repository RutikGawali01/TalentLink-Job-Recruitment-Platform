package com.jobportal.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//This is a DTO (Data Transfer Object).It represents login input data coming from the frontend.
public class AuthenticationRequest {
    private String email;
    private String password;

}
