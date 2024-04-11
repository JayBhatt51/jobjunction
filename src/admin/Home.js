import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { baseurl } from '../baseurl';
const Home = () => {
  const [bookingCount, setBookingCount] = useState(0);
  const [incomingRequestCount, setIncomingRequestCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [taskerCount, setTaskerCount] = useState(0);
  const [taskerCancelCount, setTaskerCancelCount] = useState(0);
  const [taskerConfirmCount, setTaskerConfirmCount] = useState(0);
  const [taskerIncompleteCount, setTaskerIncompleteCount] = useState(0);
  const [taskerPendingCount, setTaskerPendingCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [userCancelCount, setUserCancelCount] = useState(0);
  const [userConfirmCount, setUserConfirmCount] = useState(0);
  const [userIncompleteCount, setUserIncompleteCount] = useState(0);
  const [userPendingCount, setUserPendingCount] = useState(0);
  const [userReviewsCount, setUserReviewsCount] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await fetch(`https://jj-bend.onrender.com/${endpoint}`);
        const data = await response.json();
        setter(data.length);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    
fetchData('adminbookings', setBookingCount);
fetchData('adminincomingrequest', setIncomingRequestCount);
fetchData('adminnotifications', setNotificationsCount);
fetchData('admintasker', setTaskerCount);
fetchData('admintaskercancel', setTaskerCancelCount);
fetchData('admintaskerconfirm', setTaskerConfirmCount);
fetchData('admintaskerincompleted', setTaskerIncompleteCount);
fetchData('admintaskerPending', setTaskerPendingCount);
fetchData('admintasks', setTasksCount);
fetchData('adminuser', setUserCount);
fetchData('adminusercancel', setUserCancelCount);
fetchData('adminuserconfirm', setUserConfirmCount);
fetchData('adminuserincompleted', setUserIncompleteCount);
fetchData('adminuserPending', setUserPendingCount);
fetchData('adminuserreviews', setUserReviewsCount);
  }, []);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['Booking', 'Incoming Requests', 'Notifications', 'Tasker', 'Tasker Cancel', 'Tasker Confirm', 'Tasker Incompleted', 'Tasker Pending', 'Tasks', 'User', 'User Cancel', 'User Confirm', 'User Incompleted', 'User Pending', 'User Reviews'],
        datasets: [{
          label: 'Counts',
          data: [
            bookingCount, incomingRequestCount, notificationsCount, taskerCount, taskerCancelCount, taskerConfirmCount, taskerIncompleteCount, taskerPendingCount, tasksCount, userCount, userCancelCount, userConfirmCount, userIncompleteCount, userPendingCount, userReviewsCount
          ],
          backgroundColor: 'rgba(0, 0, 255, 0.2)', // blue color
          borderColor: 'rgba(0, 0, 255, 1)', // blue color
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [bookingCount, incomingRequestCount, notificationsCount, taskerCount, taskerCancelCount, taskerConfirmCount, taskerIncompleteCount, taskerPendingCount, tasksCount, userCount, userCancelCount, userConfirmCount, userIncompleteCount, userPendingCount, userReviewsCount]);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await fetch(`http://localhost:4000/${endpoint}`);
        const data = await response.json();
        setter(data.length);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData('admintasks', setTasksCount);
fetchData('adminuser', setUserCount);
fetchData('admintasker', setTaskerCount);
  }, []);

  useEffect(() => {
    let pieChartInstance = null;

    if (userCount > 0 || taskerCount > 0 || tasksCount > 0) {
      // Destroy previous pie chart instance
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }

      // Create new pie chart instance
      pieChartInstance = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: ['User', 'Tasker', 'Task'],
          datasets: [{
            label: 'Count',
            data: [userCount, taskerCount, tasksCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', // Red
              'rgba(54, 162, 235, 0.5)', // Blue
              'rgba(255, 206, 86, 0.5)', // Yellow
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Red
              'rgba(54, 162, 235, 1)', // Blue
              'rgba(255, 206, 86, 1)', // Yellow
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    }

    return () => {
      // Cleanup function to destroy the pie chart instance
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }
    };
  }, [userCount, taskerCount, tasksCount]);

  useEffect(() => {
    let userPieChartInstance = null;

    if (userCancelCount > 0 || userConfirmCount > 0 || userIncompleteCount > 0 || userPendingCount > 0) {
      // Destroy previous user pie chart instance
      if (userPieChartInstance) {
        userPieChartInstance.destroy();
      }

      // Create new user pie chart instance
      userPieChartInstance = new Chart('userPieChart', {
        type: 'pie',
        data: {
          labels: ['User Cancel', 'User Confirm', 'User Incompleted', 'User Pending'],
          datasets: [{
            label: 'Count',
            data: [userCancelCount, userConfirmCount, userIncompleteCount, userPendingCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', // Red
              'rgba(54, 162, 235, 0.5)', // Blue
              'rgba(255, 206, 86, 0.5)', // Yellow
              'rgba(75, 192, 192, 0.5)'  // Green
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Red
              'rgba(54, 162, 235, 1)', // Blue
              'rgba(255, 206, 86, 1)', // Yellow
              'rgba(75, 192, 192, 1)'  // Green
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    }

    return () => {
      // Cleanup function to destroy the user pie chart instance
      if (userPieChartInstance) {
        userPieChartInstance.destroy();
      }
    };
  }, [userCancelCount, userConfirmCount, userIncompleteCount, userPendingCount]);

  useEffect(() => {
    let taskerPieChartInstance = null;

    if (taskerCancelCount > 0 || taskerConfirmCount > 0 || taskerIncompleteCount > 0 || taskerPendingCount > 0) {
      // Destroy previous tasker pie chart instance
      if (taskerPieChartInstance) {
        taskerPieChartInstance.destroy();
      }

      // Create new tasker pie chart instance
      taskerPieChartInstance = new Chart('taskerPieChart', {
        type: 'pie',
        data: {
          labels: ['Tasker Cancel', 'Tasker Confirm', 'Tasker Incompleted', 'Tasker Pending'],
          datasets: [{
            label: 'Count',
            data: [taskerCancelCount, taskerConfirmCount, taskerIncompleteCount, taskerPendingCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', // Red
              'rgba(54, 162, 235, 0.5)', // Blue
              'rgba(255, 206, 86, 0.5)', // Yellow
              'rgba(75, 192, 192, 0.5)'  // Green
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Red
              'rgba(54, 162, 235, 1)', // Blue
              'rgba(255, 206, 86, 1)', // Yellow
              'rgba(75, 192, 192, 1)'  // Green
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    }

    return () => {
      // Cleanup function to destroy the tasker pie chart instance
      if (taskerPieChartInstance) {
        taskerPieChartInstance.destroy();
      }
    };
  }, [taskerCancelCount, taskerConfirmCount, taskerIncompleteCount, taskerPendingCount]);

  useEffect(() => {
    let otherPieChartInstance = null;

    if (bookingCount > 0 || incomingRequestCount > 0 || notificationsCount > 0 || userReviewsCount > 0) {
      // Destroy previous pie chart instance
      if (otherPieChartInstance) {
        otherPieChartInstance.destroy();
      }

      // Create new pie chart instance
      otherPieChartInstance = new Chart('otherPieChart', {
        type: 'pie',
        data: {
          labels: ['Booking', 'Incoming Requests', 'Notifications', 'User Reviews'],
          datasets: [{
            label: 'Count',
            data: [bookingCount, incomingRequestCount, notificationsCount, userReviewsCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', // Red
              'rgba(54, 162, 235, 0.5)', // Blue
              'rgba(255, 206, 86, 0.5)', // Yellow
              'rgba(153, 102, 255, 0.5)' // Purple
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Red
              'rgba(54, 162, 235, 1)', // Blue
              'rgba(255, 206, 86, 1)', // Yellow
              'rgba(153, 102, 255, 1)' // Purple
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    }

    return () => {
      // Cleanup function to destroy the pie chart instance
      if (otherPieChartInstance) {
        otherPieChartInstance.destroy();
      }
    };
  }, [bookingCount, incomingRequestCount, notificationsCount, userReviewsCount]);

  return (
    <div className=''>
      <h1 className='text-center my-3'>Home</h1>
      <div className='d-flex flex-wrap justify-content-center'>
        <div style={{ width: '160vh', height: '80vh' }} className='my-3'>
          <canvas ref={chartRef} />
        </div>
        <div className='d-flex justify-content-around'>
          <div style={{ width: '21vw', height: '39vh' }}>
            <canvas id="pieChart" />
          </div>
          <div style={{ width: '21vw', height: '40vh' }}>
            <canvas id="userPieChart" />
          </div>
          <div style={{ width: '21vw', height: '40vh' }}>
            <canvas id="taskerPieChart" />
          </div>
          <div style={{ width: '21vw', height: '40vh' }}>
            <canvas id="otherPieChart" />
          </div>
        </div>
      </div>
      <div className=''>
        <hr />
        <h1 className='text-center'>Tables</h1>
        <div className='d-flex flex-wrap justify-content-center'>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Booking</h5>
              <p className="card-text">Number of bookings: {bookingCount}</p>
              <p></p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Incoming Requests</h5>
              <p className="card-text">Number of incoming requests: {incomingRequestCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              <p className="card-text">Number of notifications: {notificationsCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Tasker</h5>
              <p className="card-text">Number of tasker: {taskerCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Tasker Cancel</h5>
              <p className="card-text">Number of tasker cancel: {taskerCancelCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Tasker Confirm</h5>
              <p className="card-text">Number of tasker confirm: {taskerConfirmCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Tasker Incompleted</h5>
              <p className="card-text">Number of tasker incompleted: {taskerIncompleteCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Tasker Pending</h5>
              <p className="card-text">Number of tasker pending: {taskerPendingCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Tasks</h5>
              <p className="card-text">Number of tasks: {tasksCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">User</h5>
              <p className="card-text">Number of users: {userCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">User Cancel</h5>
              <p className="card-text">Number of user cancel: {userCancelCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">User Confirm</h5>
              <p className="card-text">Number of user confirm: {userConfirmCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">User Incompleted</h5>
              <p className="card-text">Number of user incompleted: {userIncompleteCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">User Pending</h5>
              <p className="card-text">Number of user pending: {userPendingCount}</p>
            </div>
          </div>
          <div className="card m-3 shadow" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">User Reviews</h5>
              <p className="card-text">Number of user reviews: {userReviewsCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
