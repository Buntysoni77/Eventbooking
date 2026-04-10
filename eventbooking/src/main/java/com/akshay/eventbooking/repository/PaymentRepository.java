package com.akshay.eventbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.akshay.eventbooking.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Changed Integer to Long to match modern JPA standards for IDs
}