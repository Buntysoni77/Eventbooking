package com.akshay.eventbooking.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.akshay.eventbooking.entity.Event;
import com.akshay.eventbooking.repository.EventRepository;
import com.akshay.eventbooking.service.AiService;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*")
public class AiController {

    @Autowired
    private AiService aiService;

    @Autowired
    private EventRepository eventRepository;

    //searching
    @GetMapping("/search")
    public List<Event> smartSearch(@RequestParam String query) {
        if (query == null || query.trim().isEmpty()) {
            return eventRepository.findAll();
        }

        String keyword = aiService.processQuery(query.trim());
        List<Event> results;

        if (keyword.equalsIgnoreCase("all")) {
            results = eventRepository.findAll();
        } else {
            results = eventRepository.findByKeyword(keyword);
        }

        // LinkedHashSet removes duplicates
        return new ArrayList<>(new LinkedHashSet<>(results));
    }

    //AI CHAT(using RAG)
    @GetMapping("/chat")
    public String chat(@RequestParam String query) {
        return aiService.getSmartResponse(query);
    }

    // AUTOCOMPLETE SUGGESTIONS
    @GetMapping("/suggestions")
    public String getSuggestions(@RequestParam String query) {
        return aiService.getQuerySuggestions(query);
    }
}
