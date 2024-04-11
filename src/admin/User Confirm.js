import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const UserConfirm = () => {
  const [confirmations, setConfirmations] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/adminuserconfirm`)
      .then(response => response.json())
      .then(data => setConfirmations(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>User Confirmations</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {confirmations.map((confirmation, index) => (
          <div className="accordion-item" key={confirmation._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {confirmation.taskdate} - {confirmation.taskname}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>Task Slot:</strong> {confirmation.taskslot}</p>
                <p><strong>Tasker Name:</strong> {confirmation.taskername}</p>
                <p><strong>Tasker Phone:</strong> {confirmation.taskerphone}</p>
                <p><strong>Task Price:</strong> {confirmation.taskprice}</p>
                <p><strong>Task Name:</strong> {confirmation.taskname}</p>
                <p><strong>Review:</strong> {confirmation.review}</p>
                <p><strong>User ID:</strong> {confirmation.userId}</p>
                <p><strong>Tasker ID:</strong> {confirmation.taskerId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserConfirm;
