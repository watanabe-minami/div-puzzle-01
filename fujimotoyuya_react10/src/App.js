import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Todo from './components/Todo';

function App() {

  const [isAuth, setIsAuth] = useState(false);

  return (

    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />}></Route>
        <Route path="/todo" element={<Todo setIsAuth={isAuth} />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
