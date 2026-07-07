package com.skillconnect.service;

import com.skillconnect.entity.Mechanic;
import com.skillconnect.repository.MechanicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MechanicService {

    private final MechanicRepository mechanicRepository;

    public MechanicService(MechanicRepository mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    // Get all mechanics
    public List<Mechanic> getAllMechanics() {
        return mechanicRepository.findAll();
    }

    // Add mechanic
    public Mechanic saveMechanic(Mechanic mechanic) {
        return mechanicRepository.save(mechanic);
    }

    // Update mechanic
    public Mechanic updateMechanic(Long id, Mechanic updatedMechanic) {

        Mechanic mechanic = mechanicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mechanic not found"));

        mechanic.setFullName(updatedMechanic.getFullName());
        mechanic.setPhone(updatedMechanic.getPhone());
        mechanic.setEmail(updatedMechanic.getEmail());
        mechanic.setSpecialization(updatedMechanic.getSpecialization());
        mechanic.setExperience(updatedMechanic.getExperience());
        mechanic.setCity(updatedMechanic.getCity());
        mechanic.setAddress(updatedMechanic.getAddress());
        mechanic.setLatitude(updatedMechanic.getLatitude());
        mechanic.setLongitude(updatedMechanic.getLongitude());
        mechanic.setRating(updatedMechanic.getRating());
        mechanic.setAvailable(updatedMechanic.getAvailable());

        return mechanicRepository.save(mechanic);
    }

    // Delete mechanic
    public void deleteMechanic(Long id) {
        mechanicRepository.deleteById(id);
    }
    // Search mechanics
public List<Mechanic> searchMechanics(String keyword) {
    return mechanicRepository.searchMechanics(keyword);
}
// Get mechanic by id
public Mechanic getMechanicById(Long id) {

    return mechanicRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Mechanic not found"));
}
}