import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, disableUser } from '../redux/adminSlice';

function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.users);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    dispatch(updateUser(editingUser));
    setEditingUser(null);
  };

  const handleDisable = (userId) => {
    if (window.confirm('Are you sure you want to disable this user?')) {
      dispatch(disableUser(userId));
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <select 
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>{user.active ? 'Active' : 'Disabled'}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDisable(user.id)}>Disable</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="edit-modal">
          <h3>Edit User</h3>
          <label>Role:</label>
          <select 
            value={editingUser.role}
            onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
