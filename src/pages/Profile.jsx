import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../features/auth/authSlice.js";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Profile = () => {
  const dispatch = useDispatch();
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

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Profile;
