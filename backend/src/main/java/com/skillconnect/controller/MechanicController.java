package com.skillconnect.controller;


import com.skillconnect.entity.Mechanic;
import com.skillconnect.service.MechanicService;

import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/mechanics")
@CrossOrigin(origins = "*")
public class MechanicController {


    private final MechanicService mechanicService;



    public MechanicController(
            MechanicService mechanicService) {

        this.mechanicService = mechanicService;

    }






    // Get all mechanics

    @GetMapping
    public List<Mechanic> getAllMechanics() {

        return mechanicService.getAllMechanics();

    }








    // Get available mechanics only

    @GetMapping("/available")
    public List<Mechanic> getAvailableMechanics() {

        return mechanicService.getAvailableMechanics();

    }








    // Add mechanic

    @PostMapping
    public Mechanic addMechanic(
            @RequestBody Mechanic mechanic) {


        return mechanicService.saveMechanic(
                mechanic
        );

    }









    // Update mechanic details

    @PutMapping("/{id}")
    public Mechanic updateMechanic(
            @PathVariable Long id,
            @RequestBody Mechanic mechanic) {


        return mechanicService.updateMechanic(
                id,
                mechanic
        );

    }









    // Update mechanic availability

    // Example:
    // PUT /api/mechanics/1/availability?status=AVAILABLE

    @PutMapping("/{id}/availability")
    public Mechanic updateAvailability(
            @PathVariable Long id,
            @RequestParam String status) {


        return mechanicService.updateAvailability(
                id,
                status
        );

    }









    // Delete mechanic

    @DeleteMapping("/{id}")
    public void deleteMechanic(
            @PathVariable Long id) {


        mechanicService.deleteMechanic(
                id
        );

    }









    // Search mechanics

    @GetMapping("/search")
    public List<Mechanic> searchMechanics(
            @RequestParam String keyword) {


        return mechanicService.searchMechanics(
                keyword
        );

    }









    // Get nearby mechanics
    // Example:
    // /api/mechanics/nearby?latitude=16.5062&longitude=80.6480&distance=10

    @GetMapping("/nearby")
    public List<Mechanic> getNearbyMechanics(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "10") Double distance) {


        return mechanicService.getNearbyMechanics(
                latitude,
                longitude,
                distance
        );

    }









    // Get mechanic by id

    @GetMapping("/{id}")
    public Mechanic getMechanicById(
            @PathVariable Long id) {


        return mechanicService.getMechanicById(
                id
        );

    }


}