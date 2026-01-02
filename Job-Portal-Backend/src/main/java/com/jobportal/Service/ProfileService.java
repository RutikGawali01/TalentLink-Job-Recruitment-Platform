package com.jobportal.Service;

import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Exception.JobPortalException;

import java.util.List;

public interface ProfileService {
    public Long createProfile(String email) throws JobPortalException;

    public ProfileDTO getProfile(Long id) throws JobPortalException;

    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws  JobPortalException;

    public List<ProfileDTO> getAllProfile();
}
