import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ReviewMechanic() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [review, setReview] = useState({
    rating: 5,
    comment: ""
  });

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {

    try {

      const response = await api.get(
        `/api/bookings/${bookingId}`
      );

      setBooking(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/api/reviews",
        {
          rating: review.rating,
          comment: review.comment,
          customerName: booking.customerName,
          mechanic: {
            id: booking.mechanic.id
          },
          booking: {
            id: booking.id
          }
        }
      );

      alert(
        "Review submitted successfully"
      );

      navigate("/my-bookings");

    }
    catch (error) {

      console.log(error);

      alert(
        "Failed to submit review"
      );

    }

  };

  if (!booking) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (

    <div className="container py-5">

      <div className="card shadow p-5">

        <h2 className="text-primary mb-4">
          ⭐ Rate Mechanic
        </h2>

        <h4>
          {booking.mechanic.fullName}
        </h4>

        <p>
          Service: {booking.serviceType}
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Rating
            </label>

            <select
              className="form-select"
              value={review.rating}
              onChange={(e) =>
                setReview({
                  ...review,
                  rating: e.target.value
                })
              }
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

          </div>

          <div className="mb-4">

            <label className="form-label">
              Review
            </label>

            <textarea
              className="form-control"
              rows="5"
              placeholder="Share your experience..."
              value={review.comment}
              onChange={(e) =>
                setReview({
                  ...review,
                  comment: e.target.value
                })
              }
              required
            />

          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Submit Review
          </button>

        </form>

      </div>

    </div>

  );

}

export default ReviewMechanic;