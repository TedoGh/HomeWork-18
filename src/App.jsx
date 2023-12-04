import { useState } from "react";
import "./App.css";
import UserTodo from "./components/UserTodo";

const API_KEY = "5RciHyEmrQwXEP4philXNBVdFV6BTDrBIyp_3HqBA7t22nmp9Q";

const App = () => {
  const [userTodo, setUserTodo] = useState([]);

  const getTodos = () => {
    fetch("/api/v1/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response failed");
        return res.json();
      })
      .then((data) => setUserTodo(data.items))
      .catch((err) => console.log(err));
  };

  const onFormSubmit = (taskName) => {
    fetch("/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([{ taskName, completed: false }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response failed");
        return res.json();
      })
      .then((data) =>
        setUserTodo((prev) => [
          {
            taskName: data.items[0].taskName,
            id: data.items[0]._uuid,
          },
          ...prev,
        ])
      )
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <UserTodo onFormSubmit={onFormSubmit} />
      {userTodo.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.taskName}</h3>
          </div>
        );
      })}
      <button onClick={getTodos}>GET TODOS</button>
    </div>
  );
};

export default App;
