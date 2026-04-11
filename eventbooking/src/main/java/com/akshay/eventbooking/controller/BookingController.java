package com.akshay.eventbooking.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.akshay.eventbooking.entity.Booking;
import com.akshay.eventbooking.repository.BookingRepository;
import com.akshay.eventbooking.service.BookingService;
import com.akshay.eventbooking.service.JwtUtil;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BookingRepository bookingRepository;

    //Booking Event
    @PostMapping("/book")
    public String bookEvent(
            @RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody Booking booking) {

        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return "Error: Invalid or missing Token";
            }

            // Extract email (removes "Bearer " prefix)
            String email = jwtUtil.extractEmail(token.substring(7));
            return bookingService.bookTicket(booking, email);

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: Could not process booking";
        }
    }

    // user booking
    @GetMapping("/my")
    public List<Booking> getMyBookings(@RequestHeader("Authorization") String token) {
        // Strip prefix safely
        String cleanToken = (token != null && token.startsWith("Bearer ")) 
                            ? token.substring(7) 
                            : token;
                            
        String email = jwtUtil.extractEmail(cleanToken);
        return bookingService.getBookingsByUser(email);
    }

    // admin all books
    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
