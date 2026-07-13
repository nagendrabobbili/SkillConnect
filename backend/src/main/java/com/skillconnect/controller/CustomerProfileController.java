package com.skillconnect.controller;

import com.skillconnect.entity.User;
import com.skillconnect.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer/profile")
@CrossOrigin("*")
public class CustomerProfileController {

    private final UserRepository userRepository;

    public CustomerProfileController(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{email}")
    public User getProfile(
            @PathVariable String email
    ) {

        return userRepository
                .findByEmail(email)
                .orElseThrow();

    }

    @PutMapping("/{email}")
    public User updateProfile(
            @PathVariable String email,
            @RequestBody User updatedUser
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        user.setName(
                updatedUser.getName()
        );

        user.setPhone(
                updatedUser.getPhone()
        );

        user.setEmail(
                updatedUser.getEmail()
        );

        return userRepository.save(user);
    }
}