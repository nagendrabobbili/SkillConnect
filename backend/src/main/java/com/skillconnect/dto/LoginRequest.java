package com.skillconnect.dto;

public class LoginRequest {

    // Can be email or phone number
    private String username;

    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(
            String username) {

        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password) {

        this.password = password;
    }
}