package com.jobportal.Service;

import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.ProfileRepository;
import com.jobportal.entity.Profile;
import com.jobportal.utility.Utilities;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("profileService")
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{
    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private final ModelMapper modelMapper;

    @Override
    public Long createProfile(String email) throws JobPortalException {
        Profile profile = new Profile();
        profile.setId(Utilities.getNextSequence("profiles"));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profileRepository.save(profile);

        return profile.getId();



    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

        return profile.toDTO();   // returning DTO using constructor conversion
    }


    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {

        // check profile exists before updating
        profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

        // Convert DTO -> Entity using constructor
        Profile profile = profileDTO.toEntity();

        profileRepository.save(profile);

        // return updated data using Entity → DTO conversion
        return profile.toDTO();
    }

    @Override
    public List<ProfileDTO> getAllProfile() {
       return profileRepository.findAll().stream().map((x)-> x.toDTO()).toList();
    }

}
