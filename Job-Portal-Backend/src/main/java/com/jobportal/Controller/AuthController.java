package com.jobportal.Controller;

import com.jobportal.DTO.AccountType;
import com.jobportal.Repository.CompanyJoinRequestRepository;
import com.jobportal.Repository.EmployerProfileRepository;
import com.jobportal.Repository.ProfileRepository;
import com.jobportal.Repository.UserRepository;
import com.jobportal.entity.CompanyJoinRequest;
import com.jobportal.entity.EmployerProfile;
import com.jobportal.entity.Profile;
import com.jobportal.entity.User;
import com.jobportal.jwt.AuthenticationRequest;
import com.jobportal.jwt.AuthenticationResponse;
import com.jobportal.jwt.CustomUserDetails;
import com.jobportal.jwt.JwtHelper;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
@Slf4j
@Tag(name = "Auth Login APIs")
public class AuthController {

//     this is not required  while  using Slf4jj
//    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private EmployerProfileRepository employerProfileRepository;


    @Autowired
    private AuthenticationManager authenticationManager;// password verification happens
    //core Spring Security engine which calls userDetailsService , checks password

    @Autowired
    private CompanyJoinRequestRepository  companyJoinRequestRepository;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationTokn(@RequestBody AuthenticationRequest request) {

        // 1. Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 2. Load user details for JWT
        final UserDetails userDetails =
                userDetailsService.loadUserByUsername(request.getEmail());

        final String jwt = jwtHelper.generateToken(userDetails);

        // 3. Fetch user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean profileCompleted = false;
        boolean resumeUploaded = false;

        // 4. Fetch profile depending on account type
        if (user.getProfileId() != null) {

            if (user.getAccountType() == AccountType.APPLICANT) {

                Profile profile = profileRepository.findById(user.getProfileId())
                        .orElse(null);

                if (profile != null) {
                    profileCompleted = Boolean.TRUE.equals(profile.getProfileCompleted());
                    resumeUploaded = Boolean.TRUE.equals(profile.getResumeUploaded());
                }

            } else if (user.getAccountType() == AccountType.EMPLOYER) {

                EmployerProfile employerProfile =
                        employerProfileRepository.findById(user.getProfileId())
                                .orElse(null);

                if (employerProfile != null) {
                    profileCompleted = employerProfile.isProfileCompleted();
//                    resumeUploaded = true; // employers don't upload resume
                }
            }
        }

        // 5. Employer company request status
        String status = "NONE";

        if (user.getAccountType() == AccountType.EMPLOYER) {

            Optional<CompanyJoinRequest> requestOptional =
                    companyJoinRequestRepository.findByEmployerId(user.getProfileId());

            if (requestOptional.isPresent()) {
                status = requestOptional.get().getStatus();
            }
        }

        // 6. Build response
        AuthenticationResponse response = new AuthenticationResponse(
                jwt,
                user.getAccountType().name(),
                user.getProfileId(),
                user.getCompanyId(),
                user.getOnboardingStep(),
                status,
                profileCompleted,
                resumeUploaded
        );

//        logger.info("Login successfully..");
        log.info("Login successfully ..");
        return ResponseEntity.ok(response);
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
