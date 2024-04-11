import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const UserIncompleted = () => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/adminuserincompleted`)
      .then(response => response.json())
      .then(data => setIncompleteTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>User Incompleted Tasks</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {incompleteTasks.map((task, index) => (
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
                <p><strong>Reason:</strong> {task.reason || 'No reason provided'}</p>
                <p><strong>Review:</strong> {task.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserIncompleted;
