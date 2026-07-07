package com.skillconnect.controller;

import com.skillconnect.dto.LoginRequest;
import com.skillconnect.entity.User;
import com.skillconnect.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {


    private final UserRepository userRepository;


    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userRepository.save(user);

    }


    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {


        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> 
                new RuntimeException("User not found"));


        if(!user.getPassword().equals(request.getPassword())) {

            throw new RuntimeException("Invalid password");

        }


        return user;

    }

}