package com.skillconnect.controller;

import com.skillconnect.entity.User;
import com.skillconnect.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/customers")
@CrossOrigin("*")
public class AdminCustomerController {

    private final UserRepository userRepository;

    public AdminCustomerController(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    // ================= GET ALL CUSTOMERS =================

    @GetMapping
    public List<User> getCustomers() {

        return userRepository.findByRole(
                "CUSTOMER"
        );

    }


    // ================= GET SINGLE CUSTOMER DETAILS =================

    @GetMapping("/{id}")
    public User getCustomerById(
            @PathVariable Long id
    ) {

        return userRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Customer not found"
                        )
                );

    }


    // ================= UPDATE CUSTOMER =================

    @PutMapping("/{id}")
    public User updateCustomer(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow();

        user.setName(
                updatedUser.getName()
        );

        user.setEmail(
                updatedUser.getEmail()
        );

        user.setPhone(
                updatedUser.getPhone()
        );

        userRepository.save(user);

        return user;
    }


    // ================= DELETE CUSTOMER =================

    @DeleteMapping("/{id}")
    public String deleteCustomer(
            @PathVariable Long id
    ) {

        userRepository.deleteById(id);

        return "Customer deleted successfully";

    }


    // ================= BLOCK CUSTOMER =================

    @PutMapping("/block/{id}")
    public String blockCustomer(
            @PathVariable Long id
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow();

        user.setBlocked(true);

        userRepository.save(user);

        return "Customer blocked";

    }


    // ================= UNBLOCK CUSTOMER =================

    @PutMapping("/unblock/{id}")
    public String unblockCustomer(
            @PathVariable Long id
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow();

        user.setBlocked(false);

        userRepository.save(user);

        return "Customer unblocked";

    }

}