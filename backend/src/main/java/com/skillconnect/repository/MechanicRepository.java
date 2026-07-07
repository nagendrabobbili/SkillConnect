package com.skillconnect.repository;

import com.skillconnect.entity.Mechanic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MechanicRepository extends JpaRepository<Mechanic, Long> {

    @Query("SELECT m FROM Mechanic m WHERE " +
           "LOWER(m.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(m.city) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(m.specialization) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Mechanic> searchMechanics(String keyword);

}