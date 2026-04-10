package com.akshay.eventbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.akshay.eventbooking.entity.Event;
import com.akshay.eventbooking.entity.UserHistory;
import com.akshay.eventbooking.repository.EventRepository;
import com.akshay.eventbooking.repository.UserHistoryRepository;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;
import org.json.JSONObject;
import org.json.JSONArray;

@Service
public class AiService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    public String processQuery(String query) {
        query = query.toLowerCase();
        if (query.contains("music")) return "music";
        if (query.contains("sports") || query.contains("cricket")) return "sports";
        if (query.contains("tech")) return "tech";
        if (query.contains("food")) return "food";
        if (query.contains("comedy")) return "comedy";
        return "all";
    }

    public String getSmartResponse(String query) {
        try {
            URL url = new URL("https://api.groq.com/openai/v1/chat/completions");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + apiKey.trim());
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String topType = getUserTopInterest("akshay");
            List<Event> rawEvents = topType.isEmpty() ? eventRepository.findAll() : eventRepository.findByTypeContainingIgnoreCase(topType);

            // ✅ FILTER DUPLICATES FROM RAG CONTEXT
            Set<Event> uniqueEvents = new LinkedHashSet<>(rawEvents);

            if (uniqueEvents.isEmpty()) return "⚠️ No events found.";

            StringBuilder context = new StringBuilder();
            int count = 1;
            for (Event e : uniqueEvents) {
                context.append(count++).append(". ").append(e.getName())
                       .append(" (").append(e.getType()).append(") at ")
                       .append(e.getLocation()).append("\\n");
            }

            JSONObject payload = new JSONObject();
            payload.put("model", "llama-3.1-8b-instant");
            JSONArray messages = new JSONArray();
            messages.put(new JSONObject().put("role", "system").put("content", "You are an event recommendation assistant. ONLY use provided events."));
            messages.put(new JSONObject().put("role", "user").put("content", "User query: " + query + "\\n\\nAvailable events:\\n" + context.toString()));
            payload.put("messages", messages);

            try (OutputStream os = conn.getOutputStream()) {
                os.write(payload.toString().getBytes("utf-8"));
            }

            Scanner sc = new Scanner(conn.getInputStream());
            String response = sc.useDelimiter("\\A").next();
            sc.close();

            return new JSONObject(response).getJSONArray("choices").getJSONObject(0).getJSONObject("message").getString("content");

        } catch (Exception e) {
            return "⚠️ Failed: " + e.getMessage();
        }
    }

    private String getUserTopInterest(String username) {
        List<UserHistory> history = userHistoryRepository.findByUsername(username);
        if (history.isEmpty()) return "";
        Map<String, Integer> count = new HashMap<>();
        for (UserHistory h : history) {
            count.put(h.getEventType(), count.getOrDefault(h.getEventType(), 0) + 1);
        }
        return Collections.max(count.entrySet(), Map.Entry.comparingByValue()).getKey();
    }

    public String getQuerySuggestions(String query) {
        // Simple suggestion logic
        return "Suggestions: Music Festivals, Cricket Matches, Tech Expos";
    }
}