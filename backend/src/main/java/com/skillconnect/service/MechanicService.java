package com.skillconnect.service;

import com.skillconnect.entity.Mechanic;
import com.skillconnect.entity.User;
import com.skillconnect.repository.MechanicRepository;
import com.skillconnect.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MechanicService {

    private final MechanicRepository mechanicRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public MechanicService(
            MechanicRepository mechanicRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.mechanicRepository = mechanicRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Get all mechanics
    public List<Mechanic> getAllMechanics() {

        return mechanicRepository.findAll();
    }

    // Get available mechanics
    public List<Mechanic> getAvailableMechanics() {

        return mechanicRepository.findByAvailabilityStatus(
                "AVAILABLE"
        );
    }

    // Get nearby mechanics
    public List<Mechanic> getNearbyMechanics(
            Double userLatitude,
            Double userLongitude,
            Double distance) {

        List<Mechanic> mechanics =
                mechanicRepository.findByAvailabilityStatus(
                        "AVAILABLE"
                );

        return mechanics.stream()

                .filter(mechanic -> {

                    if (mechanic.getLatitude() == null ||
                            mechanic.getLongitude() == null) {

                        return false;
                    }

                    double calculatedDistance =
                            calculateDistance(
                                    userLatitude,
                                    userLongitude,
                                    mechanic.getLatitude(),
                                    mechanic.getLongitude()
                            );

                    return calculatedDistance <= distance;
                })

                .collect(Collectors.toList());
    }

    // Haversine Formula
    private double calculateDistance(
            double lat1,
            double lon1,
            double lat2,
            double lon2) {

        final int EARTH_RADIUS = 6371;

        double latDistance =
                Math.toRadians(
                        lat2 - lat1
                );

        double lonDistance =
                Math.toRadians(
                        lon2 - lon1
                );

        double a =

                Math.sin(latDistance / 2)
                        *
                        Math.sin(latDistance / 2)

                        +

                        Math.cos(
                                Math.toRadians(lat1)
                        )

                        *

                        Math.cos(
                                Math.toRadians(lat2)
                        )

                        *

                        Math.sin(lonDistance / 2)

                        *

                        Math.sin(lonDistance / 2);

        double c =

                2 *

                        Math.atan2(
                                Math.sqrt(a),
                                Math.sqrt(1 - a)
                        );

        return EARTH_RADIUS * c;
    }

    // Add mechanic and create login account
    public Mechanic saveMechanic(
            Mechanic mechanic) {

        if (mechanic.getAvailabilityStatus() == null) {

            mechanic.setAvailabilityStatus(
                    "AVAILABLE"
            );
        }

        User user = new User();

        user.setName(
                mechanic.getFullName()
        );

        user.setEmail(
                mechanic.getEmail()
        );

        // NEW FOR PHONE LOGIN
        user.setPhone(
                mechanic.getPhone()
        );

        user.setPassword(
                passwordEncoder.encode(
                        mechanic.getPassword()
                )
        );

        user.setRole(
                "MECHANIC"
        );

        userRepository.save(
                user
        );

        return mechanicRepository.save(
                mechanic
        );
    }

    // Update mechanic
    public Mechanic updateMechanic(
            Long id,
            Mechanic updatedMechanic) {

        Mechanic mechanic =
                mechanicRepository.findById(id)

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Mechanic not found"
                                )
                        );

        mechanic.setFullName(
                updatedMechanic.getFullName()
        );

        mechanic.setPhone(
                updatedMechanic.getPhone()
        );

        mechanic.setEmail(
                updatedMechanic.getEmail()
        );

        mechanic.setSpecialization(
                updatedMechanic.getSpecialization()
        );

        mechanic.setExperience(
                updatedMechanic.getExperience()
        );

        mechanic.setCity(
                updatedMechanic.getCity()
        );

        mechanic.setAddress(
                updatedMechanic.getAddress()
        );

        mechanic.setLatitude(
                updatedMechanic.getLatitude()
        );

        mechanic.setLongitude(
                updatedMechanic.getLongitude()
        );

        mechanic.setRating(
                updatedMechanic.getRating()
        );

        mechanic.setAvailabilityStatus(
                updatedMechanic.getAvailabilityStatus()
        );

        return mechanicRepository.save(
                mechanic
        );
    }

    // Update availability
    public Mechanic updateAvailability(
            Long id,
            String status) {

        Mechanic mechanic =
                mechanicRepository.findById(id)

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Mechanic not found"
                                )
                        );

        if (!status.equals("AVAILABLE")
                && !status.equals("BUSY")
                && !status.equals("OFFLINE")) {

            throw new RuntimeException(
                    "Invalid availability status"
            );
        }

        mechanic.setAvailabilityStatus(
                status
        );

        return mechanicRepository.save(
                mechanic
        );
    }

    // Delete mechanic
    public void deleteMechanic(
            Long id) {

        mechanicRepository.deleteById(
                id
        );
    }

    // Search mechanics
    public List<Mechanic> searchMechanics(
            String keyword) {

        return mechanicRepository.searchMechanics(
                keyword
        );
    }

    // Get mechanic by id
    public Mechanic getMechanicById(
            Long id) {

        return mechanicRepository.findById(id)

                .orElseThrow(
                        () -> new RuntimeException(
                                "Mechanic not found"
                        )
                );
    }
}