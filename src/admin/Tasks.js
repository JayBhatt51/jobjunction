import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddTaskPopup from './AddTaskPopup';
import EditTaskPopup from './EditTaskPopup';
import { baseurl } from '../baseurl';
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [showEditTaskPopup, setShowEditTaskPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseurl}/admintasks`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddTaskClick = () => {
    setShowAddTaskPopup(true);
  };

  const handleEditTaskClick = (task) => {
    setSelectedTask(task);
    setShowEditTaskPopup(true);
  };

  const closeAddTaskPopup = () => {
    setShowAddTaskPopup(false);
  };

  const closeEditTaskPopup = () => {
    setShowEditTaskPopup(false);
  };

  return (
    <>
      <h1 className='text-center my-3'>Tasks</h1>
      {message && <h3 className='text-dark text-center my-3'>{message}</h3>}
      <button onClick={handleAddTaskClick} className="btn btn-secondary btn-sm mx-2">Add New Task</button>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {tasks.map((task, index) => (
          <div className="accordion-item" key={task._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {task.task}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>Category:</strong>{task.category}</p>
                <p><strong>Price:</strong> {task.price}</p>
                <button onClick={() => handleEditTaskClick(task)} className="btn btn-secondary btn-sm mx-2">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showAddTaskPopup && <AddTaskPopup onClose={closeAddTaskPopup} setMessage={setMessage}/>}
      {showEditTaskPopup && <EditTaskPopup task={selectedTask} onClose={closeEditTaskPopup} setMessage={setMessage} />}
    </>
  );
};

export default Tasks;
