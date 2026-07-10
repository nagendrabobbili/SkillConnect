package com.skillconnect.service;

import com.skillconnect.entity.Review;
import com.skillconnect.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(
            ReviewRepository reviewRepository) {

        this.reviewRepository = reviewRepository;
    }

    public Review saveReview(
            Review review) {

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByMechanic(
            Long mechanicId) {

        return reviewRepository
                .findByMechanicId(mechanicId);
    }

    public boolean alreadyReviewed(
            Long bookingId) {

        return reviewRepository
                .existsByBookingId(bookingId);
    }
}