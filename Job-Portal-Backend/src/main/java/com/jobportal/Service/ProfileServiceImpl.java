package com.jobportal.Service;

import com.jobportal.DTO.ProfileCompletionDTO;
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
import java.util.Base64;
import java.util.List;

@Service("profileService")
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{
    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private final ModelMapper modelMapper;

    @Override
    public Long createProfile(Long userId, String email ,String name) throws JobPortalException {
        Profile profile = new Profile();

        profile.setId(Utilities.getNextSequence("profiles"));


        profile.setUserId(userId);
        profile.setName(name);
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profile.setEducations(new ArrayList<>());
        profile.setPortfolio(null);
        profileRepository.save(profile);

        return profile.getId();
    }

    //
    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {

        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

        return profile.toDTO();   // returning DTO using constructor conversion
        // here bcz of file type conversion - thats why  we did not prefer model mapper
    }


    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {

        Profile profile = profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

        /* ---------- BASIC INFO ---------- */

        if (profileDTO.getHeadline() != null) {
            profile.setHeadline(profileDTO.getHeadline());
        }
        profile.setLocation(profileDTO.getLocation());
        profile.setTotalExp(profileDTO.getTotalExp());
        profile.setAbout(profileDTO.getAbout());
        profile.setPortfolio(profileDTO.getPortfolio());
        profile.setSavedJobs(profileDTO.getSavedJobs());



        /* ---------- PROFILE PICTURE (IMPORTANT) ---------- */
        if (profileDTO.getPicture() != null) {
            profile.setPicture(Base64.getDecoder().decode(profileDTO.getPicture()));
        }

        /* ---------- BANNER ---------- */
        if (profileDTO.getBanner() != null) {
            profile.setBanner(Base64.getDecoder().decode(profileDTO.getBanner()));
        }
        if(profileDTO.getResume()!=null){
            profile.setResume(Base64.getDecoder().decode(profileDTO.getResume()));
        }

        profile.setResumeName(profileDTO.getResumeName());
        profile.setResumeUploadDate(profileDTO.getResumeUploadDate());


        /* ---------- SKILLS ---------- */
        if (profileDTO.getSkills() != null) {
            profile.setSkills(profileDTO.getSkills());
        }

        /* ---------- EXPERIENCE ---------- */
        if (profileDTO.getExperiences() != null) {
            profile.setExperiences(profileDTO.getExperiences());
        }

        /* ---------- EDUCATION (FIXED) ---------- */
        if (profileDTO.getEducations() != null) {
            profile.setEducations(profileDTO.getEducations());
        }

        /* ---------- CERTIFICATIONS ---------- */
        if (profileDTO.getCertifications() != null) {
            profile.setCertifications(profileDTO.getCertifications());
        }

        Profile saved = profileRepository.save(profile);
        return saved.toDTO();
    }


    @Override
    public List<ProfileDTO> getAllProfile() {
       return profileRepository.findAll()
               .stream()
               .map((x)->
                       x.toDTO()).toList();
    }

    @Override
    public ProfileCompletionDTO getApplicantProfileCompletion(Long applicantId) {

        Profile p = profileRepository.findById(applicantId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        List<String> missing = new ArrayList<>();

        if (!notEmpty(p.getName())) missing.add("name");
        if (!notEmpty(p.getHeadline())) missing.add("headline");
        if (!notEmpty(p.getLocation())) missing.add("location");
        if (!notEmpty(p.getAbout())) missing.add("about");
        if (p.getSkills() == null || p.getSkills().isEmpty()) missing.add("skills");
        if (p.getTotalExp() == null) missing.add("totalExperience");

        int totalFields = 6;
        int completedFields = totalFields - missing.size();
        int percentage = (completedFields * 100) / totalFields;

        boolean completed = percentage == 100;

        if (p.getProfileCompleted() == null || p.getProfileCompleted() != completed) {
            p.setProfileCompleted(completed);
            profileRepository.save(p);
        }

        return new ProfileCompletionDTO(completed, percentage, missing);
    }

    private boolean notEmpty(String s) {
        return s != null && !s.trim().isEmpty();
    }


}
