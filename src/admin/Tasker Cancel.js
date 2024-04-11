import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const TaskerCancel = () => {
  const [cancellations, setCancellations] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/admintaskercancel`)
      .then(response => response.json())
      .then(data => setCancellations(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>Tasker Cancellations</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {cancellations.map((cancellation, index) => (
          <div className="accordion-item" key={cancellation._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {cancellation.taskdate} - {cancellation.taskname}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>Task Slot:</strong> {cancellation.taskslot}</p>
                <p><strong>Tasker Name:</strong> {cancellation.taskername}</p>
                <p><strong>Tasker Phone:</strong> {cancellation.taskerphone}</p>
                <p><strong>Task Price:</strong> {cancellation.taskprice}</p>
                <p><strong>User ID:</strong> {cancellation.userId}</p>
                <p><strong>Tasker ID:</strong> {cancellation.taskerId}</p>
                <p><strong>Username:</strong> {cancellation.username}</p>
                <p><strong>User Phone:</strong> {cancellation.userphone}</p>
                <p><strong>User Address:</strong> {cancellation.useraddress}</p>
                <p><strong>Reason:</strong> {cancellation.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskerCancel;
