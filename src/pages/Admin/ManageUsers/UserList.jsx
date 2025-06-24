import { useEffect, useState } from 'react';
import { getUsers, saveUsers, seedUsers } from './userService';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function init() {
      await seedUsers();
      setUsers(getUsers());
    }
    init();
  }, []);

  const handleDelete = (id) => {
    const updated = users.filter((u) => u.id !== id);
    saveUsers(updated);
    setUsers(updated);
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Username</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name.firstname} {u.name.lastname}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>
                {/* Edit will be implemented later */}
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
