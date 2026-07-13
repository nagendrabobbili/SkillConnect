package com.skillconnect.controller;


import com.skillconnect.entity.Booking;
import com.skillconnect.repository.BookingRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admin/bookings")
@CrossOrigin("*")
public class AdminBookingController {


    private final BookingRepository bookingRepository;


    public AdminBookingController(
            BookingRepository bookingRepository
    ){
        this.bookingRepository = bookingRepository;
    }



    // Get bookings of a customer
    @GetMapping("/customer/{phone}")
    public List<Booking> getCustomerBookings(
            @PathVariable String phone
    ){

        return bookingRepository
                .findByCustomerPhone(phone);

    }

}