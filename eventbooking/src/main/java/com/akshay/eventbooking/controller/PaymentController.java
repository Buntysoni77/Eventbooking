package com.akshay.eventbooking.controller;

import org.springframework.web.bind.annotation.*;
import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
public class PaymentController {

    private static final String KEY = "rzp_test_SZuOn9hWxQGJ5n";
    private static final String SECRET = "UEsc7oFEuYp7Vxn78qRCH3BV";

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestParam int amount) {
        try {
            RazorpayClient client = new RazorpayClient(KEY, SECRET);

            JSONObject options = new JSONObject();
            options.put("amount", amount * 100); 
            options.put("currency", "INR");
            options.put("receipt", "txn_" + System.currentTimeMillis());

            Order order = client.orders.create(options);
            return ResponseEntity.ok(order.toString());
        } catch (RazorpayException e) {
            return ResponseEntity.status(500).body("Payment Gateway Error: " + e.getMessage());
        }
    }
}