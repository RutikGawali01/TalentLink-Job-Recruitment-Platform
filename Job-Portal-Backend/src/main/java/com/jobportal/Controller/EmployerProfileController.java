package com.jobportal.Controller;

import com.jobportal.DTO.EmployerProfileDTO;
import com.jobportal.DTO.ProfileCompletionDTO;
import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Service.EmployerProfileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employer/profile")
@CrossOrigin(origins = "*")
@Tag(name = "Employer-Profile APIs")
public class EmployerProfileController {

    @Autowired
    private EmployerProfileService employerProfileService;

    // ✅ Create / Update profile
    @PreAuthorize("hasRole('EMPLOYER')")
    @PutMapping("/update")
    public ResponseEntity<EmployerProfileDTO> saveProfile(
            @RequestBody EmployerProfileDTO dto) throws JobPortalException {

        EmployerProfileDTO saved = employerProfileService.saveOrUpdateProfile(dto);
        return ResponseEntity.ok(saved);
    }


    // ✅ Get employer profile
    @PreAuthorize("hasRole('EMPLOYER')")
    @GetMapping("/get/{id}")
    public ResponseEntity<EmployerProfileDTO> getProfile(@PathVariable Long id) {

        EmployerProfileDTO profile = employerProfileService.getEmployerProfile(id);
        return ResponseEntity.ok(profile);
    }

    // ✅ Check profile completeness (for onboarding redirect)
    @PreAuthorize("hasRole('EMPLOYER')")
    @GetMapping("/check/{id}")
    public ResponseEntity<ProfileCompletionDTO> getProfileCompletion(@PathVariable Long id) {

        ProfileCompletionDTO  completed = employerProfileService.getProfileCompletion(id);
        return ResponseEntity.ok(completed);
    }


    // get all profiles
    @GetMapping("/getAll")
    public ResponseEntity<List<EmployerProfileDTO>> getAllProfile() throws Exception{
        //profileService.getProfile(id);
        return new ResponseEntity<>( employerProfileService.getAllProfile(), HttpStatus.OK);
    }


}
