package com.skillconnect.controller;

import com.skillconnect.entity.Review;
import com.skillconnect.service.ReviewService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(
            ReviewService reviewService) {

        this.reviewService = reviewService;
    }

    // Only customers can submit reviews
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public Review addReview(
            @RequestBody Review review) {

        return reviewService
                .saveReview(review);
    }

    // Anyone logged in can view mechanic reviews
    @GetMapping("/mechanic/{id}")
    @PreAuthorize("isAuthenticated()")
    public List<Review> getReviews(
            @PathVariable Long id) {

        return reviewService
                .getReviewsByMechanic(id);
    }

    // Check whether review already exists
    @GetMapping("/exists/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public boolean alreadyReviewed(
            @PathVariable Long bookingId) {

        return reviewService
                .alreadyReviewed(bookingId);
    }
}