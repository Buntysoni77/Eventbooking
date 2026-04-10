package com.akshay.eventbooking.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.akshay.eventbooking.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Matches the userEmail field in the Booking Entity
    List<Booking> findByUserEmail(String userEmail);  
}