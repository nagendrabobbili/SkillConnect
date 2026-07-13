package com.skillconnect.repository;

import com.skillconnect.entity.Booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository
        extends JpaRepository<Booking, Long> {


    // Get bookings by customer phone
    List<Booking> findByCustomerPhone(
            String customerPhone
    );


    // Get bookings by customer email
    List<Booking> findByCustomerEmail(
            String customerEmail
    );


    // Get bookings by customer id
    // Used by Admin to view customer history
    // List<Booking> findByCustomerId(
    //         Long customerId
    // );


    // Get all bookings of a mechanic
    List<Booking> findByMechanic_Id(
            Long mechanicId
    );


    // Count accepted jobs for a mechanic
    long countByMechanic_IdAndStatus(
            Long mechanicId,
            String status
    );

}