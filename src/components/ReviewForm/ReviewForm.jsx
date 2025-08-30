import './ReviewForm.css'
import React, { useEffect } from "react";

function ReviewForm({onSubmit,...rowData}) {
    const [name, setName] = React.useState("");
    const [review, setReview] = React.useState("");
    const [rating, setRating] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({...rowData, rating});
    }
    useEffect(() => {
        setName(sessionStorage.getItem("name"));
    }, []);
    return (
        <div className="review-form">
            <div className="review-form-head">
                <h2>Given Your Review</h2>
            </div>
            <div className="review-form-body">
                <form method="POST" action="">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Review:</label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label className="rating-label">Rating:</label>
                        {
                            new Array(5).fill(0).map((_, i) => (
                                <i className={`fa fa-star star ${i < rating ? 'active' : ''}`} key={i} onClick={() => setRating(i + 1)}></i>))
                        }
                    </div>
                </form>
            </div>
            <div className="review-form-footer">
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ReviewForm;
