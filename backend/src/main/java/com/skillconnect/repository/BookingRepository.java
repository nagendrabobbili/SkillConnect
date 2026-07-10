package com.skillconnect.repository;

import com.skillconnect.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerPhone(String customerPhone);

    List<Booking> findByCustomerEmail(String customerEmail);

    List<Booking> findByMechanicId(Long mechanicId);
}