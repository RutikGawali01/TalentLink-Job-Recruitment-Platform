package com.jobportal.Service;

import com.jobportal.DTO.LoginDTO;
import com.jobportal.DTO.UserDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.UserRepository;
import com.jobportal.entity.User;
import com.jobportal.utility.Utilities;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service(value = "userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private final ModelMapper modelMapper;

    @Override
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
        Optional<User> optionalUser = userRepository.findByEmail(userDTO.getEmail());
        if(optionalUser.isPresent()) throw new JobPortalException("USER_FOUND");

        userDTO.setId(Utilities.getNextSequence("users"));
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        //User user = userDTO.toEntity();

        User user = modelMapper.map(userDTO, User.class);

       user =  userRepository.save(user);
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

}
