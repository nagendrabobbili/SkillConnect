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
    ){
        this.userRepository = userRepository;
    }



    // Get all customers
    @GetMapping
    public List<User> getCustomers(){

        return userRepository.findByRole("CUSTOMER");

    }



    // Delete customer
    @DeleteMapping("/{id}")
    public String deleteCustomer(
            @PathVariable Long id
    ){

        userRepository.deleteById(id);

        return "Customer deleted successfully";

    }



    // Block customer
    @PutMapping("/block/{id}")
    public String blockCustomer(
            @PathVariable Long id
    ){

        User user =
        userRepository.findById(id)
        .orElseThrow();


        user.setBlocked(true);

        userRepository.save(user);


        return "Customer blocked";

    }



    // Unblock customer
    @PutMapping("/unblock/{id}")
    public String unblockCustomer(
            @PathVariable Long id
    ){

        User user =
        userRepository.findById(id)
        .orElseThrow();


        user.setBlocked(false);

        userRepository.save(user);


        return "Customer unblocked";

    }

}