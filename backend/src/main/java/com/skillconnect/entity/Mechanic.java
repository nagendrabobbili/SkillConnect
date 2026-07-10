package com.skillconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mechanics")
public class Mechanic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String phone;

    private String email;

    private String password;

    private String specialization;

    private Integer experience;

    private String city;

    private String address;

    private Double latitude;

    private Double longitude;

    private Double rating;

    private Boolean available;


    public Mechanic() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id=id;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName=fullName;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone=phone;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email=email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password=password;
    }


    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization=specialization;
    }


    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience=experience;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city=city;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address=address;
    }


    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude=latitude;
    }


    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude=longitude;
    }


    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating=rating;
    }


    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available=available;
    }
}