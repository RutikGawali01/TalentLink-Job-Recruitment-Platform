package com.jobportal.Service;

import com.jobportal.DTO.*;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.NotificationRepository;
import com.jobportal.Repository.OTPRepository;
import com.jobportal.Repository.UserRepository;
import com.jobportal.entity.OTP;
import com.jobportal.entity.User;
import com.jobportal.utility.Data;
import com.jobportal.utility.Utilities;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service(value = "userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private final ModelMapper modelMapper;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private EmployerProfileService employerProfileService;

    @Autowired
    private NotificationService notificationService;

    @Override
    @Transactional(rollbackFor = JobPortalException.class)
    // this is bcz transcation does not roll back for job portal exception it only roll back for runtime exec
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
        //Optional<User> avoids NullPointerException
        Optional<User> optionalUser = userRepository.findByEmail(userDTO.getEmail());

        // if user present -- stop registration
        if(optionalUser.isPresent())
            throw new JobPortalException("USER_FOUND");

        // creates profile at the time of signup
        if(userDTO.getAccountType() == AccountType.APPLICANT){
            userDTO.setProfileId(
                    profileService.createProfile(userDTO.getEmail())
            );
        }else if(userDTO.getAccountType() == AccountType.EMPLOYER){
            userDTO.setProfileId(
                    employerProfileService.createProfile(userDTO.getEmail())
            );
        }

        userDTO.setId(Utilities.getNextSequence("users"));
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        //User user = userDTO.toEntity();

        User user = modelMapper.map(userDTO, User.class);
//        System.out.println("DTO profileId = " + userDTO.getProfileId());
//        System.out.println("Entity profileId before save = " + user.getProfileId());

        user =  userRepository.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO getUserByEmail(String email) throws JobPortalException {
        User user =  userRepository.findByEmail(email)
                .orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));

        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException {
        User user= userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));

        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())){
            throw new JobPortalException("INVALID_CREDENTIALS");
        }
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public boolean sendOTP(String email) throws Exception {
       User user =  userRepository.findByEmail(email)
                .orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));

        MimeMessage mm = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mm, true);
        message.setTo(email);
        message.setSubject("Your OTP Code");
        String genOTP = Utilities.generateOTP();
        String hashedOTP = passwordEncoder.encode(genOTP); // all OTPs can be exposed if stored normally

        OTP otp = new OTP(email, hashedOTP, LocalDateTime.now());
        otpRepository.save(otp);

        message.setText(Data.getMessage(genOTP, user.getName()) , true);
        mailSender.send(mm);
        return true;
    }

    @Override
    public boolean verifyOTP(String email, String otp) throws Exception {

       OTP otpEntity = otpRepository.findById(email).orElseThrow(()->
               new JobPortalException("OTP_NOT_FOUND") );

       if(!passwordEncoder.matches(otp,otpEntity.getOtpCode())){
           throw new JobPortalException("OTP_INCORRECT");
       }
        // One-time use → delete immediately
        otpRepository.deleteByEmail(email);
        return true;
    }

    @Override
    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException {
        User user= userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));

        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepository.save(user);
        NotificationDTO notif = new NotificationDTO();
        notif.setUserId(user.getId());
        notif.setMessage("Password Reset successfully...");
        notif.setAction("Password Reset");
        notificationService.sendNotification(notif);
        return  new ResponseDTO("Password changed successfully.");
    }

    //Runs every 60 seconds (1 minute)
//    @Scheduled(fixedRate = 60000)
//    public void  removeExpiredOTPs(){
//        //Any OTP created before this is expired
//        LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
//
//        //Fetches all expired OTPs from DB
//        List<OTP> expiredOTPs = otpRepository.findByCreationTimeBefore(expiry);
//
//        if(!expiredOTPs.isEmpty()){
//            otpRepository.deleteAll(expiredOTPs);
//            //System.out.println("Removed "+expiredOTPs.size()+" expired OTPs");
//        }
//
//    }


}
