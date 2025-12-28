package com.jobportal.Controller;

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

@RestController
@CrossOrigin
@RequestMapping("/profiles")
@Validated
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/get/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) throws Exception{
        //profileService.getProfile(id);
        return new ResponseEntity<>( profileService.getProfile(id), HttpStatus.OK);
    }


    @PutMapping("/update")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO ) throws Exception{
        //profileService.getProfile(id);
        return new ResponseEntity<>( profileService.updateProfile(profileDTO), HttpStatus.OK);
    }
}
