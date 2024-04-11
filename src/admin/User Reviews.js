import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const UserReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/adminuserreviews`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>User Reviews</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {reviews.map((review, index) => (
          <div className="accordion-item" key={review._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {review.taskdate} - {review.taskname}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>Task Slot:</strong> {review.taskslot}</p>
                <p><strong>Tasker Name:</strong> {review.taskername}</p>
                <p><strong>Tasker Phone:</strong> {review.taskerphone}</p>
                <p><strong>Task Price:</strong> {review.taskprice}</p>
                <p><strong>User ID:</strong> {review.userId}</p>
                <p><strong>Tasker ID:</strong> {review.taskerId}</p>
                <p><strong>Review:</strong> {review.review}</p>
                <p><strong>Ratings:</strong> {review.ratings}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserReviews;
