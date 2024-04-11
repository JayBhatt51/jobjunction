import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const TaskerPending = () => {
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/admintaskerPending`)
      .then(response => response.json())
      .then(data => setPendingTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>Tasker Pending</h1>
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
                <p><strong>User Name:</strong> {task.username}</p>
                <p><strong>User Phone:</strong> {task.userphone}</p>
                <p><strong>User Address:</strong> {task.useraddress}</p>
                <p><strong>Task Price:</strong> {task.taskprice}</p>
                <p><strong>Tasker ID:</strong> {task.taskerId}</p>
                <p><strong>User ID:</strong> {task.userId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskerPending;
