package com.jobportal.Controller;

import com.jobportal.DTO.ProfileCompletionDTO;
import com.jobportal.DTO.ProfileDTO;
import com.jobportal.DTO.ResponseDTO;
import com.jobportal.Service.ProfileService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/profiles")
@Validated
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // get profile by id
    @GetMapping("/get/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) throws Exception{
        //profileService.getProfile(id);
        return new ResponseEntity<>( profileService.getProfile(id), HttpStatus.OK);
    }

//  update existing profile
    @PutMapping("/update")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO ) throws Exception{
        //profileService.getProfile(id);
        return new ResponseEntity<>( profileService.updateProfile(profileDTO), HttpStatus.OK);
    }

    // get all profiles
    @GetMapping("/getAll")
    public ResponseEntity<List<ProfileDTO>> getAllProfile() throws Exception{
        //profileService.getProfile(id);
        return new ResponseEntity<>( profileService.getAllProfile(), HttpStatus.OK);
    }

    @GetMapping("/check/{id}")
    public ResponseEntity<ProfileCompletionDTO> getApplicantProfileCompletion(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                profileService.getApplicantProfileCompletion(id)
        );
    }


}
