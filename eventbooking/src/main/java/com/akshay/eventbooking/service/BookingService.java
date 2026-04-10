package com.akshay.eventbooking.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.akshay.eventbooking.entity.Booking;
import com.akshay.eventbooking.entity.Event;
import com.akshay.eventbooking.entity.User;
import com.akshay.eventbooking.repository.BookingRepository;
import com.akshay.eventbooking.repository.EventRepository;
import com.akshay.eventbooking.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public String bookTicket(Booking booking, String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) return "Error: User not found";

        Event event = eventRepository.findById(booking.getEventId())
                .orElseThrow(() -> new RuntimeException("Event NOT FOUND"));

        if (event.getAvailableSeats() < booking.getTickets()) {
            return "Error: Not enough seats available";
        }

        // Update Seats
        event.setAvailableSeats(event.getAvailableSeats() - booking.getTickets());
        eventRepository.save(event);

        // Update Booking with correct User Email
        booking.setUserEmail(email); 
        booking.setAmount(event.getPrice() * booking.getTickets());
        
        bookingRepository.save(booking);
        return "Booking Successful";
    }

    public List<Booking> getBookingsByUser(String email) {
        // Now accurately finds bookings by email instead of numeric ID
        return bookingRepository.findByUserEmail(email);
    }
}