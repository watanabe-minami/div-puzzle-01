import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuth }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName);
    }
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <div className="log-btn">
      <p>{username} さん</p>
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default Logout;
