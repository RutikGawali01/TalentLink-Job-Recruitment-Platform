package com.jobportal.Service;

import com.jobportal.DTO.EmployerProfileDTO;
import com.jobportal.DTO.ProfileCompletionDTO;
import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Exception.JobPortalException;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public interface EmployerProfileService {

    EmployerProfileDTO saveOrUpdateProfile(EmployerProfileDTO dto) throws JobPortalException;

    EmployerProfileDTO getEmployerProfile(Long id);


    List<EmployerProfileDTO> getAllProfile();

    Long createProfile(Long userId , @NotBlank(message = "{user.email.absent}") @Email(message = "{user.email.invalid}") String email , String Name) throws JobPortalException;

    ProfileCompletionDTO getProfileCompletion(Long id);
}
