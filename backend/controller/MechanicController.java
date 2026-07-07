package com.skillconnect.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class MechanicController {

    @GetMapping("/api/mechanics")
    public List<Map<String, Object>> getMechanics() {

        return List.of(
                Map.of(
                        "id", 1,
                        "name", "Ramesh",
                        "specialization", "Bike Mechanic",
                        "city", "Vijayawada",
                        "rating", 4.8
                ),
                Map.of(
                        "id", 2,
                        "name", "Suresh",
                        "specialization", "Car Mechanic",
                        "city", "Rajahmundry",
                        "rating", 4.6
                )
        );
    }
}