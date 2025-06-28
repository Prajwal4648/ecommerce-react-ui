import React from "react";
import "./UsersComponent.css";
// If you need UserList:
import UserList from "./UserList";
// If you need the service:
//import { userService } from "./userService";

const UsersComponent = () => {
  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Customer', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', status: 'Active', joined: '2024-02-20' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'Admin', status: 'Active', joined: '2024-01-10' }
  ];

  return (
    <div className="users-container">
      <div className="users-header">
        <h3 className="users-title">Users Management</h3>
        <button className="add-user-btn">
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      <div className="search-bar">
        <Search size={16} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search users..." 
          className="search-input"
        />
      </div>

      <div className="users-table">
        <div className="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        
        {users.map(user => (
          <div key={user.id} className="table-row">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
            <span className={`user-role ${user.role.toLowerCase()}`}>{user.role}</span>
            <span className={`user-status ${user.status.toLowerCase()}`}>{user.status}</span>
            <div className="user-actions">
              <button className="action-btn edit-btn">
                <Edit size={14} />
              </button>
              <button className="action-btn delete-btn">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="users-stats">
        <div className="stat-item">
          <span className="stat-label">Total Users</span>
          <span className="stat-value">3</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active This Month</span>
          <span className="stat-value active">3</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">New This Week</span>
          <span className="stat-value new">1</span>
        </div>
      </div>
    </div>
  );
};

export default UsersComponent;


// import React from "react";
// import "./UsersComponent.css";

// const UsersComponent = () => {
//   return (
//     <div className="users-component">
//       <h2>Manage Users</h2>
//       {/* Your users management logic here */}
//     </div>
//   );
// };

// export default UsersComponent;