import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const createPost = async () => {
    if (!title.trim() || !postText.trim()) return;

    await addDoc(collection(db, "posts"), {
      title,
      postText,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });

    navigate("/");
  };

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>日記を作成する</h1>

        <div className="inputPost">
          <div>タイトル</div>
          <input
            type="text"
            placeholder="タイトルを記入"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="inputPost">
          <textarea
            placeholder="日記内容を記入"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </div>

        <button className="postButton" onClick={createPost}>
          作成する
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
