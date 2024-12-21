import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./Todo.css";

export const Todo = ({ isAuth }) => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [completionDate, setCompletionDate] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchTodos = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const fetchedTodos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTodos(fetchedTodos);
      };
      fetchTodos();
    }
  }, [isAuthenticated]);

  const handleAddTodo = async () => {
    if (todoText.trim() === "") return;
    const newTodo = {
      text: todoText,
      completed: false,
      createdAt: new Date().toISOString(),
      completionDate: completionDate,
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
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
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
        </div>
        <button onClick={handleAddTodo}>追加</button>
      </div>

      <div className="todoList">
        {todos.map((todo) => (
          <div key={todo.id} className="todoItem">
            <div className="todoTextAria">
              <span>{todo.text}</span>
              <div className="todoDataAria">
                <span className="todoCreateDate">作成日: {new Date(todo.createdAt).toLocaleDateString()}</span>
                <span className="todoAuthor">作成者: {todo.author.username}</span>
                {todo.completionDate && (
                  <span className="todoCompleteDate">
                    完了予定日: {new Date(todo.completionDate).toLocaleDateString()}
                  </span>
                )}
                </div>
            </div>
            <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
