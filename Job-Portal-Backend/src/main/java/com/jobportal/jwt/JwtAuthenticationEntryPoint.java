package com.jobportal.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

@Component
//This class is responsible for handling unauthenticated access to secured endpoints.
//AuthenticationEntryPoint → mandatory interface for handling authentication failures
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

//    This method is automatically called by Spring Security filter chain when:
        //❌ User is not authenticated
        //❌ But tries to access a secured endpoint
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);//Sends HTTP 401 Unauthorized
        PrintWriter writer = response.getWriter();
        writer.println("Accessed Denied !! "+ authException.getMessage());//custom message to response body
    }
}
