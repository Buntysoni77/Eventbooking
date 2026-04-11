package com.akshay.eventbooking.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.akshay.eventbooking.entity.Event;
import com.akshay.eventbooking.repository.EventRepository;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    // gets all events
    // This is used for the initial home page load
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // gets event by id
    // Used when a user clicks on a specific event to see details
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    // create event
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }
}
