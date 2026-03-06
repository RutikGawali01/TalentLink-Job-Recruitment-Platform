package com.jobportal.Controller;

import com.jobportal.DTO.LoginDTO;
import com.jobportal.DTO.ResponseDTO;
import com.jobportal.DTO.UserDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    // sign-up / register
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws JobPortalException {
        userDTO = userService.registerUser(userDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    // login
    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
        UserDTO userDTO = userService.loginUser(loginDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    // send OTP for forgot password
    @PostMapping("/sendOTP/{email}")
    public ResponseEntity<ResponseDTO> sendOTP(@PathVariable @Email(message = "{user.email.invalid}") String email) throws Exception {
        userService.sendOTP(email);
        return new ResponseEntity<>(new ResponseDTO("OTP sent successfully"), HttpStatus.OK);
    }

    // verify given otp
    @GetMapping("/verifyOTP/{email}/{otp}")
    public  ResponseEntity<ResponseDTO> verifyOTP(@PathVariable @Email(message = "{user.email.invalid}") String email , @PathVariable @Pattern(regexp = "^[0-9]{6}$", message = "{otp.invalid}") String otp) throws Exception{
        userService.verifyOTP(email, otp);
        return new ResponseEntity<>(new ResponseDTO("OTP has beem verified."), HttpStatus.OK);
    }

    // change password after verifying given OTP
    @PostMapping("/changePassword")
    public ResponseEntity<ResponseDTO> changePassword(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {

        return new ResponseEntity<>(userService.changePassword(loginDTO), HttpStatus.OK);
    }






}
