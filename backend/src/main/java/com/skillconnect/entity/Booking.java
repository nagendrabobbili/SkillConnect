package com.skillconnect.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String customerName;

    private String customerPhone;

    private String serviceType;

    private LocalDate bookingDate;

    private String status;


    @ManyToOne
    @JoinColumn(name = "mechanic_id")
    private Mechanic mechanic;


    public Booking() {
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getCustomerName() {
        return customerName;
    }


    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }


    public String getCustomerPhone() {
        return customerPhone;
    }


    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }


    public String getServiceType() {
        return serviceType;
    }


    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }


    public LocalDate getBookingDate() {
        return bookingDate;
    }


    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }


    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }


    public Mechanic getMechanic() {
        return mechanic;
    }


    public void setMechanic(Mechanic mechanic) {
        this.mechanic = mechanic;
    }
}