package com.skillconnect.service;

import com.skillconnect.entity.Booking;
import com.skillconnect.entity.Mechanic;

import com.skillconnect.repository.BookingRepository;
import com.skillconnect.repository.MechanicRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final MechanicRepository mechanicRepository;


    public BookingService(
            BookingRepository bookingRepository,
            MechanicRepository mechanicRepository) {

        this.bookingRepository = bookingRepository;
        this.mechanicRepository = mechanicRepository;

    }



    // Get all bookings
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();

    }



    // Save booking
    public Booking saveBooking(
            Booking booking) {


        booking.setStatus(
                "PENDING"
        );


        return bookingRepository.save(
                booking
        );

    }



    // Get booking by id
    public Booking getBookingById(
            Long id) {


        return bookingRepository.findById(id)

                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found"
                        )
                );

    }



    // Delete booking
    public void deleteBooking(
            Long id) {


        bookingRepository.deleteById(
                id
        );

    }



    // Get bookings by customer phone
    public List<Booking> getBookingsByCustomerPhone(
            String phone) {


        return bookingRepository
                .findByCustomerPhone(
                        phone
                );

    }



    // Get bookings by customer email
    public List<Booking> getBookingsByCustomerEmail(
            String email) {


        return bookingRepository
                .findByCustomerEmail(
                        email
                );

    }



    // Get bookings by customer id
    // Used by Admin to view customer history
    // public List<Booking> getBookingsByCustomerId(
    //         Long customerId) {


    //     return bookingRepository
    //             .findByCustomerId(
    //                     customerId
    //             );

    // }



    // Get bookings for mechanic
    public List<Booking> getBookingsByMechanic(
            Long mechanicId) {


        return bookingRepository
                .findByMechanic_Id(
                        mechanicId
                );

    }



    // Update booking status
    public Booking updateBookingStatus(
            Long id,
            String status) {


        Booking booking =
                bookingRepository.findById(id)

                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found"
                        )
                );



        // Update booking status
        booking.setStatus(
                status
        );



        // Save booking first
        booking =
                bookingRepository.save(
                        booking
                );



        // Get mechanic attached to booking
        Mechanic mechanic =
                booking.getMechanic();



        if (mechanic == null) {

            throw new RuntimeException(
                    "Mechanic not found for booking"
            );

        }



        // Mechanic accepted job -> BUSY
        if ("ACCEPTED".equals(status)) {


            mechanic.setAvailabilityStatus(
                    "BUSY"
            );


            mechanicRepository.save(
                    mechanic
            );

        }



        // Mechanic completed job
        if ("COMPLETED".equals(status)) {


            long activeBookings =
                    bookingRepository
                            .countByMechanic_IdAndStatus(
                                    mechanic.getId(),
                                    "ACCEPTED"
                            );



            if (activeBookings == 0) {


                mechanic.setAvailabilityStatus(
                        "AVAILABLE"
                );


                mechanicRepository.save(
                        mechanic
                );

            }

        }



        // Mechanic rejected job
        if ("REJECTED".equals(status)) {


            long activeBookings =
                    bookingRepository
                            .countByMechanic_IdAndStatus(
                                    mechanic.getId(),
                                    "ACCEPTED"
                            );



            if (activeBookings == 0 &&
                    !"OFFLINE".equals(
                            mechanic.getAvailabilityStatus()
                    )) {


                mechanic.setAvailabilityStatus(
                        "AVAILABLE"
                );


                mechanicRepository.save(
                        mechanic
                );

            }

        }



        return booking;

    }

}