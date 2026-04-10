package com.akshay.eventbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.akshay.eventbooking.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email); 
}