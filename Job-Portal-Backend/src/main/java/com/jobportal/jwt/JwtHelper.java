package com.jobportal.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component//Spring Bean
public class JwtHelper {

    // 1 hour
    private static final long JWT_TOKEN_VALIDITY = 3600000;

    //Auto-generates a secure secret key - > Uses HMAC SHA-256 algorithm
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // 📌 Extract username or subject
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }
    //A claim is simply a piece of information stored inside a JWT token.

    // 📌 Extract expiration
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration); /// Claims::getExpiration --> Function<Claims, T> claimsResolver
    }

    // 📌 Extract any claim
    //“bcz of <T> ->  This method can return any type, depending on what you ask it to return
    //Function<Claims, T> claimsResolver
    //This is a function that:
    //takes Claims as input
    //returns some value of type T
//    So claimsResolver is basically:
//            “Logic to extract one specific claim from all claims.”
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token); //  get all claims from token
        return claimsResolver.apply(claims);
        //Claims ->  is basically a Map<String, Object>
        //
        //It contains all claims from the token
    }

    // 📌 Extract all claims
    //after successful login.
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()   // Creates a JWT parser (a tool to read and verify tokens)
                .setSigningKey(SECRET_KEY)//Sets the secret key that was used to sign the token.
                .build()// Builds the configured parser.
                .parseClaimsJws(token)
                .getBody();//Extracts the payload part of JWT , The payload = Claims.
    }

    // 📌 Check token expiry
    private boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // 📌 Generate token
    // //CustomUserDetails  implements UserDetails->  Provides core user information.
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails customUser = (CustomUserDetails) userDetails;
        claims.put("id",customUser.getId()); // private claim - custom claim
        claims.put("name", customUser.getName());
        claims.put("accountType",customUser.getAccountType());
        claims.put("profileId",customUser.getProfileId());
        return createToken(claims, userDetails.getUsername());
    }

    // 📌 Create token
    ///  subject - username/email
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SECRET_KEY)
                .compact();
    }

    // 📌 Validate token
    public boolean isTokenValid(String token, String username) {
        final String tokenUsername = getUsernameFromToken(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }
}
