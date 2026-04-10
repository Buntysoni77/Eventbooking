package com.akshay.eventbooking.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail; 
    private Long eventId;   
    private int tickets;
    private double amount;
    private LocalDateTime bookingTime;

    @PrePersist
    protected void onCreate() { this.bookingTime = LocalDateTime.now(); }

    public Long getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public int getTickets() { return tickets; }
    public void setTickets(int tickets) { this.tickets = tickets; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public LocalDateTime getBookingTime() { return bookingTime; }
}