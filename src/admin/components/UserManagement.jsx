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
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>

      <table className="w-full bg-white rounded-md overflow-hidden shadow-lg">
        <thead>
          <tr>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">ID</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Email</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Role</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Status</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && Array.isArray(users) && users.length > 0 ? (
            users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{user.id}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{user.email}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">
                  {editingUser?.id === user.id ? (
                    <select 
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      className="w-11/12 px-2 py-1.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-pink-500"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{user.active ? 'Active' : 'Disabled'}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">
                  {editingUser?.id === user.id ? (
                    <>
                      <button onClick={handleSave} className="px-4 py-2 bg-pink-600 text-white rounded text-sm transition-all duration-200 hover:bg-pink-700 mr-2">Save</button>
                      <button onClick={() => setEditingUser(null)} className="px-4 py-2 bg-gray-600 text-white rounded text-sm transition-all duration-200 hover:bg-gray-700">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)} className="px-4 py-2 bg-gray-600 text-white rounded text-sm transition-all duration-200 hover:bg-gray-700 mr-2">Edit</button>
                      <button onClick={() => handleDisable(user.id)} className="px-4 py-2 bg-red-600 text-white rounded text-sm transition-all duration-200 hover:bg-red-700">Disable</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-3.5 py-3 border-b border-gray-300">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingUser && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl z-[1000] min-w-[350px] border border-gray-200">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Edit User</h3>
          <label className="block mt-3 mb-1 text-gray-600 font-bold">Role:</label>
          <select 
            value={editingUser.role}
            onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
            className="w-full mb-3 px-2.5 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-pink-500"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleSave} className="px-5 py-2.5 bg-pink-600 text-white rounded text-sm transition-all duration-200 hover:bg-pink-700 mr-2">Save Changes</button>
          <button onClick={() => setEditingUser(null)} className="px-5 py-2.5 bg-gray-600 text-white rounded text-sm transition-all duration-200 hover:bg-gray-700">Cancel</button>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
