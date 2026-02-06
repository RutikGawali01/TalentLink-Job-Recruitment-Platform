package com.jobportal.jwt;

import com.jobportal.DTO.AccountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
//CustomUserDetails  implements UserDetails-> Provides core user information.
public class CustomUserDetails  implements UserDetails {//UserDetails is a Spring Security interface0
    // Spring Security does NOT work with your User entity directly.
    //It needs data in a specific format, which is UserDetails.

    private Long id;
    private String username;
    private String name;
    private String password;
    private long profileId;
    private AccountType accountType;
    private Collection<?extends GrantedAuthority> authorities;
}

