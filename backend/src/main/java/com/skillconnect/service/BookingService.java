package com.skillconnect.service;

import com.skillconnect.entity.Booking;
import com.skillconnect.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(
            BookingRepository bookingRepository) {

        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Booking not found"));
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public List<Booking> getBookingsByCustomerPhone(
            String phone) {

        return bookingRepository
                .findByCustomerPhone(phone);
    }

    public List<Booking> getBookingsByCustomerEmail(
            String email) {

        return bookingRepository
                .findByCustomerEmail(email);
    }

    public List<Booking> getBookingsByMechanic(
            Long mechanicId) {

        return bookingRepository
                .findByMechanicId(mechanicId);
    }

    public Booking updateBookingStatus(
            Long id,
            String status) {

        Booking booking =
                bookingRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found"));

        booking.setStatus(status);

        return bookingRepository.save(booking);
    }
}