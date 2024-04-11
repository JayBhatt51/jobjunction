import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const TaskerIncompleted = () => {
  const [incompletes, setIncompletes] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/admintaskerincompleted`)
      .then(response => response.json())
      .then(data => setIncompletes(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>Tasker Incompletes</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {incompletes.map((incomplete, index) => (
          <div className="accordion-item" key={incomplete._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {incomplete.taskdate} - {incomplete.taskname}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>Task Slot:</strong> {incomplete.taskslot}</p>
                <p><strong>Username:</strong> {incomplete.username}</p>
                <p><strong>User Phone:</strong> {incomplete.userphone}</p>
                <p><strong>User Address:</strong> {incomplete.useraddress}</p>
                <p><strong>Task Price:</strong> {incomplete.taskprice}</p>
                <p><strong>Tasker ID:</strong> {incomplete.taskerId}</p>
                <p><strong>User ID:</strong> {incomplete.userId}</p>
                <p><strong>Reason:</strong> {incomplete.reason}</p>
                <p><strong>Review:</strong> {incomplete.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskerIncompleted;
