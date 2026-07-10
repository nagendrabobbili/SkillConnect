package com.skillconnect.service;

import com.skillconnect.entity.Mechanic;
import com.skillconnect.entity.User;
import com.skillconnect.repository.MechanicRepository;
import com.skillconnect.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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



    // Add mechanic + create login account
    public Mechanic saveMechanic(Mechanic mechanic) {


        // Create User account for mechanic

        User user = new User();

        user.setName(mechanic.getFullName());

        user.setEmail(mechanic.getEmail());


        // Use password entered during registration

        user.setPassword(
                passwordEncoder.encode(
                        mechanic.getPassword()
                )
        );


        user.setRole("MECHANIC");


        userRepository.save(user);



        // Save mechanic profile

        return mechanicRepository.save(mechanic);

    }





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





    public void deleteMechanic(Long id) {

        mechanicRepository.deleteById(id);

    }





    public List<Mechanic> searchMechanics(String keyword) {

        return mechanicRepository.searchMechanics(keyword);

    }





    public Mechanic getMechanicById(Long id) {

        return mechanicRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Mechanic not found"
                    )
                );

    }

}