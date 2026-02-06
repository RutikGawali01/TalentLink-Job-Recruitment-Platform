package com.jobportal.jwt;

import com.jobportal.DTO.UserDTO;
import com.jobportal.Exception.JobPortalException;
import com.jobportal.Repository.UserRepository;
import com.jobportal.Service.UserService;
import com.jobportal.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
//UserDetailsService is a core Spring Security interface.
public class MyUserDetailsService implements UserDetailsService {
    //

    @Autowired
    private UserRepository userRepository;;

    //Spring Security automatically calls this method during login
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)// fetch user from DB
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
       //Mapping DB user → Security user
        return new CustomUserDetails(user.getId(),
                user.getEmail(),
                user.getName(),
                user.getPassword(),
                user.getProfileId(),
                user.getAccountType(),
                new ArrayList<>());
    }
}
