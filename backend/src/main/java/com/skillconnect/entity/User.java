package com.skillconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Phone number will become the primary login identifier
    @Column(unique = true, nullable = false)
    private String phone;

    // Email becomes optional
    @Column(unique = true)
    private String email;

    private String password;

    private String role;


    // Admin can block/unblock customers
    @Column(nullable = false)
    private boolean blocked = false;



    public User() {

    }


    public Long getId() {
        return id;
    }

    public void setId(
            Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(
            String name) {
        this.name = name;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(
            String phone) {
        this.phone = phone;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password) {
        this.password = password;
    }


    public String getRole() {
        return role;
    }

    public void setRole(
            String role) {
        this.role = role;
    }



    public boolean isBlocked() {
        return blocked;
    }


    public void setBlocked(
            boolean blocked) {
        this.blocked = blocked;
    }
}