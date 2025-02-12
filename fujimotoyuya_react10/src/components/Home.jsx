import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import "./Home.css"

const Home = () => {

  const [postList, setPostList] = useState([]);

  const handDelete = async(id) =>{
    await deleteDoc(doc(db, "posts", id));
    setPostList(postList.filter((post) => post.id !== id));
  }

  useEffect(() => {
      const getPosts = async() =>{
        const data =await getDocs(collection(db, "posts"));
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      };
      getPosts();
    },[]);

  return (
    <div className="homePage">
      {postList.map((post) => {
        return(
            <div className="postContents" key={post.id}>
            <div className="postHeader">
            <h1>{post.title}</h1>
          </div>
  
            {/* 内容 */}
            <div className="postTextContainer">
              {post.postText}
            </div>
    
            {/* ユーザーネーム・削除ボタン */}
            <div className="nameAndDeleteButton">
              <h2>@{post.author.username}</h2>
              {post.author.id === auth.currentUser?.uid &&(
                <button onClick={() => handDelete(post.id)}>削除</button>
              )}
              </div>
          </div>
          )
        })}
    </div>
  )
}

export default Home