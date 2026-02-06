package com.jobportal.Config;

import com.jobportal.jwt.JwtAuthenticationEntryPoint;
import com.jobportal.jwt.JwtAuthenticationFilter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;




@Configuration
public class AppConfig {
    // utility - dto conversion
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Autowired//Handles unauthenticated access
    private JwtAuthenticationEntryPoint point; // from jwt package with  commence method

    @Autowired//Runs before Spring’s authentication logic
    private JwtAuthenticationFilter filter; // from jwt package

    //CORS = Cross-Origin Resource Sharing
    //It tells Spring Security how to handle cross-origin requests (from frontend → backend)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();// object that store CORS rules.

        config.setAllowedOrigins(List.of("http://localhost:5173"));// only react app can call api
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));//Allows frontend to read JWT from response headers
        config.setAllowCredentials(true);//“This server allows credentials to be sent with cross-origin requests.”

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);//all endpoints of your backend, or sconfig object
        return source;
    }



    @Bean//Enable CORS + Disable CSRF
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth //🔹 Authorization Rules
                        .requestMatchers("OPTIONS", "/**").permitAll()//Without this → CORS errors
                        .requestMatchers("/auth/login", "/users/register", "/users/verifyOTP/**", "/users/sendOTP/**")// public api
                         // these api does not require jwt
                        .permitAll()
                        .anyRequest().authenticated()//Everything else is protected with jwt token
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point)) // if authentication fails
                // stateless session
                .sessionManagement(session ->
                        session.
                                sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        httpSecurity.addFilterBefore(
                filter,
                UsernamePasswordAuthenticationFilter.class);


        return httpSecurity.build();
    }


}
