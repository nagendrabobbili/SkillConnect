package com.skillconnect.controller;

import com.skillconnect.entity.User;
import com.skillconnect.service.UserService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService) {

        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }

    @GetMapping("/customers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getCustomers() {

        return userService.getCustomers();
    }

    @GetMapping("/mechanics")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getMechanics() {

        return userService.getMechanics();
    }
}