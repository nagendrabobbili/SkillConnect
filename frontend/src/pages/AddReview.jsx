import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import {
  FaStar,
  FaRegStar
} from "react-icons/fa";

function AddReview() {

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (e) => {

    e.preventDefault();

    try {

      const review = {

        customerName: user.name,
        customerEmail: user.email,
        rating: rating,
        comment: comment,

        mechanic: {
          id: Number(id)
        }

      };

      await api.post(
        "/api/reviews",
        review
      );

      alert(
        "Review submitted successfully"
      );

      navigate("/my-bookings");

    }
    catch(error){

      console.error(error);

      alert(
        "Failed to submit review"
      );

    }

  };

  return (

    <div
      className="container py-5"
      style={{
        maxWidth: "700px"
      }}
    >

      <div className="card shadow-lg border-0">

        <div className="card-header bg-warning text-dark text-center py-4">

          <h2>
            ⭐ Rate Your Mechanic
          </h2>

          <p className="mb-0">
            Help other customers choose the best mechanic
          </p>

        </div>

        <div className="card-body p-5">

          <form onSubmit={submitReview}>

            <div className="mb-4">

              <label className="fw-bold mb-3">
                Select Rating
              </label>

              <div>

                {
                  [1,2,3,4,5].map((star)=>(
                    <span
                      key={star}
                      style={{
                        cursor:"pointer",
                        fontSize:"35px",
                        marginRight:"10px"
                      }}
                      onClick={()=>
                        setRating(star)
                      }
                    >
                      {
                        star <= rating
                        ?
                        <FaStar color="gold"/>
                        :
                        <FaRegStar color="gold"/>
                      }
                    </span>
                  ))
                }

              </div>

              <h5 className="mt-3">
                Selected Rating:
                {" "}
                {rating}/5 ⭐
              </h5>

            </div>

            <div className="mb-4">

              <label className="fw-bold">
                Review Comment
              </label>

              <textarea
                className="form-control mt-2"
                rows="5"
                placeholder="Tell us about your experience..."
                value={comment}
                onChange={(e)=>
                  setComment(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <button
              className="btn btn-warning w-100 py-3 fw-bold"
              type="submit"
            >
              Submit Review
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddReview;