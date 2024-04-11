import React, { useState, useEffect } from 'react';
import { Col, Button, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../baseurl';
const IncomingRequest = () => {
    const location = useLocation();
    const taskerId = location.state;
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const fetchTasks = async () => {
        try {
            const response = await fetch(`${baseurl}/get-incoming`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taskerId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
        const intervalId = setInterval(fetchTasks, 60000);
        return () => clearInterval(intervalId);
    }, [taskerId]);

    const handleAccept = async (taskId) => {
        try {
            setIsButtonDisabled(true);
            const response = await fetch(`${baseurl}/give-confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requestId: taskId, confirm: "true" })
            });
            if (!response.ok) {
                throw new Error('Failed to confirm task');
            }
            navigate('/taskerprofile');
        } catch (error) {
            console.error('Error confirming task:', error);
        }
    };

    const handleCancel = async (taskId) => {
        try {
            const response = await fetch(`${baseurl}/give-confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requestId: taskId, confirm: "false" })
            });
            if (!response.ok) {
                throw new Error('Failed to cancel task');
            }
            navigate('/taskerprofile');
        } catch (error) {
            console.error('Error cancelling task:', error);
        }
    };

    return (
        <>
            <div className="container-fluid text-white justify-content-md-center my-sm-5 py-4">
                <Button className='btn btn-info border-rounded mb-3' onClick={() => { navigate('/taskerprofile') }}>
                    Back
                </Button>
                <h2 className="mb-4 text-center">New Requests</h2>
                {tasks.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        No incoming requests at the moment.
                    </Alert>
                ) : (
                    tasks.map(task => (
                        <Col key={task._id}>
                            <div className="card p-4 mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                                <h2 className="mb-4 text-center">Incoming Request</h2>
                                <p><strong>Name:</strong> {task.taskname}</p>
                                <p><strong>Date:</strong> {task.taskdate}</p>
                                <p><strong>Slot:</strong> {task.taskslot}</p>
                                <p><strong>Address:</strong> {task.useraddress}</p>
                                <p><strong>Name:</strong> {task.username}</p>
                                <p><strong>Phone:</strong> {task.userphone}</p>
                                <p><strong>Price:</strong> {task.taskprice}</p>
                                <div className="d-flex justify-content-center mt-4">
                                    <button className="btn btn-success me-2" onClick={() => handleAccept(task._id)} disabled={isButtonDisabled}>{isButtonDisabled ? 'Processing...' : 'Accept'}</button>
                                    <button className="btn btn-danger" onClick={() => handleCancel(task._id)}>Cancel</button>
                                </div>
                            </div>
                        </Col>
                    ))
                )}
            </div>
        </>
    );
};

export default IncomingRequest;
