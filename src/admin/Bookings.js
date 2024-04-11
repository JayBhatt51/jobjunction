import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`/adminbookings`)
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>Bookings</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {bookings.map((booking, index) => (
          <div className="accordion-item" key={booking._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {booking.date} - {booking.slot}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>User Coupon:</strong> {booking.usercoupon}</p>
                <p><strong>Tasker ID:</strong> {booking.taskerId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Bookings;
