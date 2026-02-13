import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://beauty-shop-backend-wegm.onrender.com";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(res.data));
      } catch (err) {
        console.error(err);
        dispatch(logout());
      }
    };
    if (!user) fetchUser();
  }, [dispatch, token, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-600">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-3xl">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h2>
              <p className="text-gray-600 mt-1">Manage your account</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-pink-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Role</p>
              <p className="text-lg font-semibold text-gray-800 capitalize">{user.role}</p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
