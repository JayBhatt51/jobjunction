import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { baseurl } from '../baseurl';
const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    // Extract the current path from the location object
    const currentPath = location.pathname;
    // Find the index of the current path in the sidebar items
    const index = [
    'adminpanel/adminuser',
    'adminpanel/adminuser-cancel',
    'adminpanel/adminuser-confirm',
    'adminpanel/adminuser-incompleted',
    'adminpanel/adminuser-pending',
    'adminpanel/adminuser-reviews',
    'adminpanel/admintasker',
    'adminpanel/admintasker-cancel',
    'adminpanel/admintasker-confirm',
    'adminpanel/tasker-incompleted',
    'adminpanel/admintasker-pending',
    'adminpanel/admintasks',
    'adminpanel/adminbookings',
    'adminpanel/adminincoming-requests',
    'adminpanel/adminnotifications'].indexOf(currentPath.substring(1));
    // Set the active item index
    setActiveItem(index);
  }, [location.pathname]);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const isActive = (index) => {
    return index === activeItem ? 'active' : '';
  };

  // Mapping between link names and target links
  const linkMapping = {
    'user': 'adminpanel/adminuser',
    'user-cancel': 'adminpanel/adminuser-cancel',
    'user-confirm': 'adminpanel/adminuser-confirm',
    'user-incompleted': 'adminpanel/adminuser-incompleted',
    'user-pending': 'adminpanel/adminuser-pending',
    'user-reviews': 'adminpanel/adminuser-reviews',
    'tasker': 'adminpanel/admintasker',
    'tasker-cancel': 'adminpanel/admintasker-cancel',
    'tasker-confirm': 'adminpanel/admintasker-confirm',
    'tasker-incompleted': 'adminpanel/admintasker-incompleted', 
    'tasker-pending': 'adminpanel/admintasker-pending',
    'tasks': 'adminpanel/admintasks',
    'bookings': 'adminpanel/adminbookings',
    'incoming-requests': 'adminpanel/adminincoming-requests',
    'notifications': 'adminpanel/adminnotifications',
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '30vh', minHeight: "100vh" }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <img src="../../logo.jpeg" alt="" width="32" height="32" className="rounded me-2" />
        <span className="fs-4">Job Junction</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {Object.entries(linkMapping).map(([name, target], index) => (
          <li key={index}>
            <Link
              to={`/${target}`}
              className={`nav-link text-white ${isActive(index)}`}
              onClick={() => handleItemClick(index)}
            >
              {name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ')}
            </Link>
          </li>
        ))}
      </ul>

      <hr />
      <div className="dropdown">
        <a href="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="../../logo.jpeg" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>Admin</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" to="/">Sign out</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
