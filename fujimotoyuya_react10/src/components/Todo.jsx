import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./Todo.css";

const Todo = ({ isAuth }) => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [completionDate, setCompletionDate] = useState("");

  useEffect(() => {
    let isMounted = true; 
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      if (isMounted) {
        const fetchedTodos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(fetchedTodos);
      }
    };

    if (isAuth) {
      fetchTodos();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuth]);

  const handleAddTodo = async () => {
    if (todoText.trim() === "") return;

    const newTodo = {
      text: todoText,
      completed: false,
      createdAt: new Date().toISOString(),
      completionDate,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    };

    const docRef = await addDoc(collection(db, "todos"), newTodo);
    setTodos([...todos, { id: docRef.id, ...newTodo }]);
    setTodoText("");
    setCompletionDate("");
  };

  const handleDeleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);

    if (!todoToDelete || todoToDelete.author.id !== auth.currentUser.uid) return;

    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="contentsAria">
      {isAuth ? (
        <div>
          <div className="inputArea">
            <input
              className="inputTodo"
              placeholder="TODOを入力"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <div className="inputCompleteDateAria">
              <label htmlFor="completionDate">完了予定日:</label>
              <input
                className="inputCompleteDate"
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
              />
              <button onClick={handleAddTodo}>追加</button>
            </div>
          </div>

          <div className="todoList">
          {todos.map((todo) => (
            <div key={todo.id} className="todoItem">
              <div className="todoTextAria">
                <span>{todo.text}</span>
                <div className="todoDataAria">
                  <span className="todoCreateDate">
                    作成日: {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                  <span className="todoAuthor">作成者: {todo.author.username}</span>
                  {todo.completionDate && (
                    <span className="todoCompleteDate">
                      完了予定日: {new Date(todo.completionDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              {todo.author.id === auth.currentUser.uid && ( // 作成者とログインユーザーが一致する場合のみ削除ボタンを表示
                <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
              )}
            </div>
          ))}
        </div>

        </div>
      ) : (
        <p>ログインしてください。</p>
      )}
    </div>
  );
};

export default Todo;
