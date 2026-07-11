package com.skillconnect.security;

import com.skillconnect.entity.User;
import com.skillconnect.repository.UserRepository;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String username
    ) throws UsernameNotFoundException {

        User user = userRepository

                .findByEmailOrPhone(
                        username,
                        username
                )

                .orElseThrow(
                        () -> new UsernameNotFoundException(
                                "User not found"
                        )
                );

        return new org.springframework.security.core.userdetails.User(

                username,

                user.getPassword(),

                Collections.singletonList(

                        new SimpleGrantedAuthority(
                                "ROLE_" + user.getRole()
                        )
                )
        );
    }
}