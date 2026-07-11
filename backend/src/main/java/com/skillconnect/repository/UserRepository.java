package com.skillconnect.repository;

import com.skillconnect.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository
        extends JpaRepository<User, Long> {

    // Login using email
    Optional<User> findByEmail(
            String email
    );

    // Login using phone number
    Optional<User> findByPhone(
            String phone
    );

    // Login using either email or phone
    Optional<User> findByEmailOrPhone(
            String email,
            String phone
    );

    // Get users by role
    List<User> findByRole(
            String role
    );

    // Count users by role
    long countByRole(
            String role
    );
}