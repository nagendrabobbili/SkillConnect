package com.skillconnect.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@Component
public class JwtUtil {


    private static final String SECRET_KEY =
            "SkillConnectSecretKeySkillConnectSecretKey123456";


    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 24; // 24 hours



    private final SecretKey secretKey;



    public JwtUtil() {

        this.secretKey =
                Keys.hmacShaKeyFor(
                        SECRET_KEY.getBytes(
                                StandardCharsets.UTF_8
                        )
                );

    }




    // Generate JWT Token
    public String generateToken(
            String email,
            String role
    ) {


        return Jwts.builder()

                .subject(email)

                .claim(
                        "role",
                        role
                )

                .issuedAt(
                        new Date()
                )

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )

                .signWith(
                        secretKey
                )

                .compact();

    }





    // Extract Claims
    public Claims extractClaims(
            String token
    ) {


        return Jwts.parser()

                .verifyWith(
                        secretKey
                )

                .build()

                .parseSignedClaims(
                        token
                )

                .getPayload();

    }





    // Extract Email
    public String extractEmail(
            String token
    ) {

        return extractClaims(token)
                .getSubject();

    }





    // Extract Role
    public String extractRole(
            String token
    ) {


        return extractClaims(token)

                .get(
                        "role",
                        String.class
                );

    }





    // Check Expiration
    public boolean isTokenExpired(
            String token
    ) {


        return extractClaims(token)

                .getExpiration()

                .before(
                        new Date()
                );

    }





    // Validate Token
    public boolean validateToken(
            String token,
            String email
    ) {


        return extractEmail(token)
                .equals(email)

                &&
                !isTokenExpired(token);

    }

}