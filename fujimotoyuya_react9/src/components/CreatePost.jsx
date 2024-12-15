import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  const createPost = async () => {
    if (!auth.currentUser) {
      alert("ログインしてください。");
      navigate("/login");
      return;
    }
    if (!title.trim() || !postText.trim()) {
      alert("タイトルと日記内容の両方を記入してください。");
      return;
    }
    await addDoc(collection(db, "posts"), {
      title: title,
      postText: postText,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

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
