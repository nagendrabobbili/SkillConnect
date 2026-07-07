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

    public MechanicController(MechanicService mechanicService) {
        this.mechanicService = mechanicService;
    }

    // Get all mechanics
    @GetMapping
    public List<Mechanic> getAllMechanics() {
        return mechanicService.getAllMechanics();
    }

    // Add mechanic
    @PostMapping
    public Mechanic addMechanic(@RequestBody Mechanic mechanic) {
        return mechanicService.saveMechanic(mechanic);
    }

    // Update mechanic
    @PutMapping("/{id}")
    public Mechanic updateMechanic(@PathVariable Long id,
                                   @RequestBody Mechanic mechanic) {
        return mechanicService.updateMechanic(id, mechanic);
    }

    // Delete mechanic
    @DeleteMapping("/{id}")
    public void deleteMechanic(@PathVariable Long id) {
        mechanicService.deleteMechanic(id);
    }
}