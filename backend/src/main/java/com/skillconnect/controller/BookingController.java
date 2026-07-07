package com.skillconnect.controller;

import com.skillconnect.entity.Booking;
import com.skillconnect.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {


    private final BookingService bookingService;


    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }


    // Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }


    // Create booking
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {

        return bookingService.saveBooking(booking);
    }


    // Get booking by id
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {

        return bookingService.getBookingById(id);
    }
    // Get customer booking history
@GetMapping("/customer/{phone}")
public List<Booking> getCustomerBookings(
        @PathVariable String phone) {

    return bookingService.getBookingsByCustomerPhone(phone);

}



    // Delete booking
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {

        bookingService.deleteBooking(id);
    }
    // Get mechanic incoming bookings
@GetMapping("/mechanic/{mechanicId}")
public List<Booking> getMechanicBookings(
        @PathVariable Long mechanicId) {

    return bookingService.getBookingsByMechanic(mechanicId);

}


// Update booking status
@PutMapping("/{id}/status/{status}")
public Booking updateBookingStatus(
        @PathVariable Long id,
        @PathVariable String status) {

    return bookingService.updateBookingStatus(id, status);

}

}