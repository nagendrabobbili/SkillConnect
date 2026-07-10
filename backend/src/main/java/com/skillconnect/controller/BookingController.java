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

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Booking getBookingById(
            @PathVariable Long id) {

        return bookingService.getBookingById(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBooking(
            @PathVariable Long id) {

        bookingService.deleteBooking(id);
    }

    // =========================
    // CUSTOMER
    // =========================

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public Booking createBooking(
            @RequestBody Booking booking) {

        return bookingService.saveBooking(booking);
    }

    // Secure customer booking history
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

    // =========================
    // MECHANIC + ADMIN
    // =========================

    @GetMapping("/mechanic/{mechanicId}")
    @PreAuthorize("hasAnyRole('MECHANIC','ADMIN')")
    public List<Booking> getMechanicBookings(
            @PathVariable Long mechanicId) {

        return bookingService
                .getBookingsByMechanic(
                        mechanicId
                );
    }

    // Only mechanic can change status
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