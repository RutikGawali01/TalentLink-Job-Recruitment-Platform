package com.jobportal.Service;

import com.jobportal.DTO.LoginDTO;
import com.jobportal.DTO.ResponseDTO;
import com.jobportal.DTO.UserDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.entity.Job;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

public interface UserService {
    public UserDTO  registerUser(UserDTO userDTO) throws JobPortalException;

    public UserDTO getUserByEmail(String email) throws JobPortalException;

    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException;

    public boolean sendOTP(String email) throws Exception;

    public boolean verifyOTP(String email, String otp) throws Exception;

    public ResponseDTO changePassword( LoginDTO loginDTO) throws JobPortalException;
}
