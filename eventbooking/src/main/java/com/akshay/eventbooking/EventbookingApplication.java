package com.akshay.eventbooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventbookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventbookingApplication.class, args);
        System.out.println("---");
        System.out.println("EventBooking AI (LLM & RAG) System Ready!");
        System.out.println("---");
    }

}
