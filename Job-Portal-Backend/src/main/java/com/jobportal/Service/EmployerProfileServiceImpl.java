package com.jobportal.Service;

import com.jobportal.DTO.EmployerProfileDTO;
import com.jobportal.DTO.ProfileCompletionDTO;
import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.EmployerProfileRepository;
import com.jobportal.entity.EmployerProfile;
import com.jobportal.utility.Utilities;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployerProfileServiceImpl implements EmployerProfileService {

    @Autowired
    private EmployerProfileRepository employerProfileRepository;

    @Override
    public EmployerProfileDTO saveOrUpdateProfile(EmployerProfileDTO dto) throws JobPortalException {
        employerProfileRepository.findById(dto.getId())
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

        EmployerProfile profile = dto.toEntity();
        employerProfileRepository.save(profile);
        return profile.toDTO();
    }

    @Override
    public EmployerProfileDTO getEmployerProfile(Long id) {
        EmployerProfile profile = employerProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EMPLOYER_PROFILE_NOT_FOUND"));

        return profile.toDTO();
    }


    @Override
    public List<EmployerProfileDTO> getAllProfile() {
        return employerProfileRepository.findAll()
                .stream()
                .map((x)->
                        x.toDTO()).toList();
    }

    @Override
    public Long createProfile(String email) throws JobPortalException {

        EmployerProfile employerProfile = new EmployerProfile();
        employerProfile.setId(Utilities.getNextSequence("employer_profile"));

        employerProfile.setFullName(null);
        employerProfile.setEmail(email);
        employerProfile.setRole(null);
        employerProfile.setPhone(null);
        employerProfile.setProfilePicture(null);
        employerProfile.setCompanyId(null);
        employerProfile.setProfileCompleted(false);

        employerProfileRepository.save(employerProfile);

        return employerProfile.getId();

    }

    @Override
    public ProfileCompletionDTO getProfileCompletion(Long employerId) {

        EmployerProfile p = employerProfileRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        List<String> missing = new ArrayList<>();

        if (!notEmpty(p.getFullName())) missing.add("Recruiter Name");
        //if(!notEmpty(p.getEmail())) missing.add("email");
        if (p.getRole() == null) {
            missing.add("Role");
        }
            if (!notEmpty(p.getPhone())) missing.add("phone");
        if (p.getProfilePicture() == null || p.getProfilePicture().length == 0) missing.add("ProfilePicture");
        if(p.getCompanyId() == null) missing.add("company id");

        int totalFields = 5;
        int completedFields = totalFields - missing.size();
        int percentage = (completedFields * 100) / totalFields;

        boolean completed = percentage == 100;

        // 🔥 sync boolean with DB (important)
        if (p.isProfileCompleted() != completed) {
            p.setProfileCompleted(completed);
            employerProfileRepository.save(p);
        }



        return new ProfileCompletionDTO(completed, percentage, missing);
    }


//    private int calculateProfileCompletion(EmployerProfile p) {
//        int total = 9;
//        int completed = 0;
//
//        if (notEmpty(p.getCompanyName())) completed++;
//        if (notEmpty(p.getTagline())) completed++;
//        if (notEmpty(p.getDescription())) completed++;
//        if (notEmpty(p.getWebsite())) completed++;
//        if (notEmpty(p.getLocation())) completed++;
//        if (notEmpty(p.getSize())) completed++;
//        if (p.getFoundedYear() != null) completed++;
//        if (p.getIndustry() != null) completed++;
//        if (p.getLogo() != null) completed++;
//
//        return (completed * 100) / total;
//    }


    private boolean notEmpty(String s) {
        return s != null && !s.trim().isEmpty();
    }


}
