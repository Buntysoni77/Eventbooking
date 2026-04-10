package com.akshay.eventbooking.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.akshay.eventbooking.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

    // ✅ Using DISTINCT to ensure the DB only returns each event once
    @Query("SELECT DISTINCT e FROM Event e WHERE " +
           "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.type) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Event> findByKeyword(@Param("keyword") String keyword);

    List<Event> findByTypeContainingIgnoreCase(String type);

    List<Event> findByPriceLessThan(double price);

    List<Event> findByTypeContainingIgnoreCaseOrLocationContainingIgnoreCase(String type, String location);
}