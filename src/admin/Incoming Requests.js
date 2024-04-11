import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const IncomingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/adminincomingrequest`)
      .then(response => response.json())
      .then(data => setRequests(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>Incoming Requests</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {requests.map((request, index) => (
          <div className="accordion-item" key={request._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {request.taskdate} - {request.taskname}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>User Address:</strong> {request.useraddress}</p>
                <p><strong>User Name:</strong> {request.username}</p>
                <p><strong>User Phone:</strong> {request.userphone}</p>
                <p><strong>Task Price:</strong> {request.taskprice}</p>
                <p><strong>Task Slot:</strong> {request.taskslot}</p>
                <p><strong>Tasker ID:</strong> {request.taskerId}</p>
                <p><strong>Confirmation:</strong> {request.confirm}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default IncomingRequests;
