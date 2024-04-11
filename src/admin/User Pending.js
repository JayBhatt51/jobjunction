import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const UserPending = () => {
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/adminuserpending`)
      .then(response => response.json())
      .then(data => setPendingTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>User Pending Tasks</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {pendingTasks.map((task, index) => (
          <div className="accordion-item" key={task._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {task.taskdate} - {task.taskname}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>Task Slot:</strong> {task.taskslot}</p>
                <p><strong>Tasker Name:</strong> {task.taskername}</p>
                <p><strong>Tasker Phone:</strong> {task.taskerphone}</p>
                <p><strong>Task Price:</strong> {task.taskprice}</p>
                <p><strong>User ID:</strong> {task.userId}</p>
                <p><strong>Tasker ID:</strong> {task.taskerId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPending;
