package com.akshay.eventbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.akshay.eventbooking.entity.User;
import com.akshay.eventbooking.repository.UserRepository;
import com.akshay.eventbooking.service.JwtUtil;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User Registered Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            
            // Return JSON instead of raw string for better frontend handling
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", existingUser);
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid Email or Password");
    }
}