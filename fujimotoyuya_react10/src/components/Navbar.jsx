import React from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ isAuth }) => {
  return (
    <nav>
      <Link to="/">ホーム</Link>
      {!isAuth ?(
      <Link to="/login">ログイン</Link>
      ) : (
        <>
          <Link to="/logout">ログアウト</Link>
          <Link to="/createpost">日記を書く</Link>
          <Link to="/todo">やることリスト</Link>
        </>
    )}
    </nav>
  );
};

export default Navbar;