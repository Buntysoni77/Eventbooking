package com.akshay.eventbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akshay.eventbooking.entity.Payment;
import com.akshay.eventbooking.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public String processPayment(Payment payment) {
        // This simulates a successful payment update in your DB
        // In a RAG system, having accurate payment status helps the AI 
        // confirm bookings to the user during chat.
        payment.setStatus("SUCCESS");

        paymentRepository.save(payment);

        return "Payment Successful";
    }
}