package com.skillconnect.controller;

import com.skillconnect.entity.Booking;
import com.skillconnect.service.BookingService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {


    private final BookingService bookingService;


    public BookingController(
            BookingService bookingService) {

        this.bookingService = bookingService;

    }



    // =========================
    // ADMIN ONLY
    // =========================


    // Get all bookings
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> getAllBookings() {

        return bookingService
                .getAllBookings();

    }



    // =========================
    // ADMIN VIEW CUSTOMER BOOKINGS
    // =========================

    @GetMapping("/customer/{phone}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> getCustomerBookings(
            @PathVariable String phone) {


        return bookingService
                .getBookingsByCustomerPhone(
                        phone
                );

    }



    // Get booking by id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Booking getBookingById(
            @PathVariable Long id) {


        return bookingService
                .getBookingById(
                        id
                );

    }



    // Delete booking
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBooking(
            @PathVariable Long id) {


        bookingService
                .deleteBooking(
                        id
                );

    }





    // =========================
    // CUSTOMER
    // =========================


    // Create booking
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public Booking createBooking(
            @RequestBody Booking booking) {


        booking.setStatus(
                "PENDING"
        );


        return bookingService
                .saveBooking(
                        booking
                );

    }



    // Customer booking history
    @GetMapping("/my-bookings")
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<Booking> getMyBookings(
            Authentication authentication) {


        String email =
                authentication.getName();


        return bookingService
                .getBookingsByCustomerEmail(
                        email
                );

    }



    // Customer cancel booking
    @PutMapping("/cancel/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public Booking cancelBooking(
            @PathVariable Long id) {


        return bookingService
                .updateBookingStatus(
                        id,
                        "CANCELLED"
                );

    }





    // =========================
    // MECHANIC + ADMIN
    // =========================


    // Mechanic booking history
    @GetMapping("/mechanic/{mechanicId}")
    @PreAuthorize("hasAnyRole('MECHANIC','ADMIN')")
    public List<Booking> getMechanicBookings(
            @PathVariable Long mechanicId) {


        return bookingService
                .getBookingsByMechanic(
                        mechanicId
                );

    }



    // Mechanic updates booking status
    @PutMapping("/{id}/status/{status}")
    @PreAuthorize("hasRole('MECHANIC')")
    public Booking updateBookingStatus(
            @PathVariable Long id,
            @PathVariable String status) {


        return bookingService
                .updateBookingStatus(
                        id,
                        status
                );

    }

}