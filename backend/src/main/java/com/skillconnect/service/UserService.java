package com.skillconnect.service;

import com.skillconnect.entity.User;
import com.skillconnect.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get only customers
    public List<User> getCustomers() {

        return userRepository.findAll()
                .stream()
                .filter(user ->
                        "CUSTOMER".equals(
                                user.getRole()))
                .toList();
    }

    // Get only mechanics
    public List<User> getMechanics() {

        return userRepository.findAll()
                .stream()
                .filter(user ->
                        "MECHANIC".equals(
                                user.getRole()))
                .toList();
    }
}