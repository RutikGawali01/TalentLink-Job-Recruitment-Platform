package com.jobportal.jwt;

import com.jobportal.Exception.JobPortalException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
//This filter runs for every incoming HTTP request.
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    //OncePerRequestFilter-> Filter runs only once per request
    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserDetailsService userDetailsService;//Loads user from DB using:

    @Override
//    This method is automatically called by Spring Security for every request.
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestHeader = request.getHeader("Authorization");//Read Authorization header
        String username = null;
        String token = null;
        //Check header + extract token
        if (requestHeader != null && requestHeader.startsWith("Bearer ")){
            token = requestHeader.substring(7);
            try {
                username = this.jwtHelper.getUsernameFromToken(token);//: Extract username from JWT  ..//Decodes JWT
            } catch (ExpiredJwtException | MalformedJwtException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired JWT token");
                return; // 🔴 STOP filter chain
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("JWT authentication failed");
                return;
            }
        }
        //Avoids re-authentication & Prevents overwriting existing authentication
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            //Load user from database &// Gets password & roles (authorities)
            UserDetails userDetails =
                    this.userDetailsService.loadUserByUsername(username);
            // Validate token against username
            Boolean validateToken =
                    this.jwtHelper.isTokenValid(token, userDetails.getUsername());

            // validate token = true -> JWT is validated →
            if(validateToken){
                //Create Authentication object
                // This request is from an authenticated user.”
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                //Attach request details // IP address , session info //it attaches extra metadata to authentication:
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                //Store authentication in SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//                “User is authenticated for this request.”
            }else {//Token exists ❌ but invalid
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid JWT token");
                return;
            }
        }
        //continue filter chain
        filterChain.doFilter(request, response);


    }
}
