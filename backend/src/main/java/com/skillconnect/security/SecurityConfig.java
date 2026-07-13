package com.skillconnect.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

                // Disable CSRF for REST API
                .csrf(csrf -> csrf.disable())


                // Enable CORS
                .cors(Customizer.withDefaults())


                // JWT stateless session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // Route authorization
                .authorizeHttpRequests(auth -> auth


                        // Public authentication APIs
                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()



                        // Admin APIs
                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")



                        // Mechanic APIs
                        .requestMatchers(
                                "/api/mechanic/**"
                        ).hasRole("MECHANIC")



                        // Booking APIs
                        // Temporary open for testing
                        .requestMatchers(
                                "/api/bookings/**"
                        ).permitAll()



                        // Customer APIs
                        .requestMatchers(
                                "/api/customer/**"
                        ).hasRole("CUSTOMER")



                        // Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()



                        // Other APIs require login
                        .anyRequest()
                        .authenticated()

                )



                // Disable default login
                .formLogin(form ->
                        form.disable()
                )


                // Disable basic auth popup
                .httpBasic(httpBasic ->
                        httpBasic.disable()
                )


                // JWT filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();

    }

}