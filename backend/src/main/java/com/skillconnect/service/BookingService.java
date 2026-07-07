package com.skillconnect.service;

import com.skillconnect.entity.Booking;
import com.skillconnect.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;


    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }


    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }


    // Create booking
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }


    // Get booking by id
    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }


    // Delete booking
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}