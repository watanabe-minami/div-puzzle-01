import React, { useState, useEffect } from 'react';
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Navigate, useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState();
  const [postText, setPostText] = useState();
  const navigate = useNavigate();

  const createPost = async() =>{
    await addDoc(collection(db, "posts"),{
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
    if (!isAuth){
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>日記を作成する</h1>

        <div className="inputPost">
          <div>タイトル</div>
          {/* タイトルエリア入力 */}
          <input 
            type="text"
            placeholder="タイトルを記入"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="inputPost">
          {/* できごと入力エリア */}
          <textarea 
            placeholder="日記内容を記入"
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

export default CreatePost