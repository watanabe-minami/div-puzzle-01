import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import { auth } from './firebase';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuth(true);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setIsAuth(false);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
        <Route path="/todo" element={<Todo isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
