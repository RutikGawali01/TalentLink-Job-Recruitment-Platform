package com.jobportal.Controller;

import com.jobportal.Repository.UserRepository;
import com.jobportal.entity.User;
import com.jobportal.jwt.AuthenticationRequest;
import com.jobportal.jwt.AuthenticationResponse;
import com.jobportal.jwt.CustomUserDetails;
import com.jobportal.jwt.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private AuthenticationManager authenticationManager;// password verification happens
    //core Spring Security engine which calls userDetailsService , checks password


    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationTokn(@RequestBody AuthenticationRequest request) {

        // 1. Authenticate
        //sends the user’s email + password into Spring Security’s authentication system
        //asks Spring Security:- Is this user real and is this password correct?”
        authenticationManager.authenticate( // //“Please authenticate this .(below object)
                new UsernamePasswordAuthenticationToken( // create authentication object
                        request.getEmail(),
                        request.getPassword()));

        // 2. Load user for JWT
        final UserDetails userDetails =
                userDetailsService.loadUserByUsername(request.getEmail());

        final String jwt = jwtHelper.generateToken(userDetails);

        // 3. Fetch FULL User entity from DB
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 4. Return onboarding state
        return ResponseEntity.ok(
                new AuthenticationResponse(
                        jwt,
                        user.getAccountType().name(),   // EMPLOYER / APPLICANT
                        user.getProfileId(),
                        user.isProfileCompleted(),
                        user.getCompanyId(),
                        user.getOnboardingStep()
                )
        );
    }



    //This method does NOT use JWT directly ❗
    //Instead, Spring injects Authentication from SecurityContextHolder.
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }// if no jwt send. invalid, expired

        Object principal = authentication.getPrincipal();//principal = CustomUserDetails

        if (!(principal instanceof CustomUserDetails)) {
            return ResponseEntity.status(400).body("Unauthorized");
        }
        //Return logged-in user
        return ResponseEntity.ok((CustomUserDetails) principal);
    }




}
