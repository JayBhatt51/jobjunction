import React, { useState, useEffect } from 'react';
import { baseurl } from '../baseurl';
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/adminnotifications`)
      .then(response => response.json())
      .then(data => setNotifications(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1 className='text-center my-3'>Notifications</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {notifications.map((notification, index) => (
          <div className="accordion-item" key={notification._id}>
            <h2 className="accordion-header">
              <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`flush-collapse-${index}`}>
                {notification.taskdate} - {notification.taskname}
              </button>
            </h2>
            <div id={`flush-collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <p><strong>User Address:</strong> {notification.useraddress}</p>
                <p><strong>User Name:</strong> {notification.username}</p>
                <p><strong>User Phone:</strong> {notification.userphone}</p>
                <p><strong>Task Price:</strong> {notification.taskprice}</p>
                <p><strong>Task Slot:</strong> {notification.taskslot}</p>
                <p><strong>Tasker ID:</strong> {notification.taskerId}</p>
                <p><strong>User ID:</strong> {notification.userId}</p>
                <p><strong>Reason:</strong> {notification.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
