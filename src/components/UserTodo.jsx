import React, { useState } from "react";

const UserTodo = ({ onFormSubmit }) => {
  const [taskName, setTaskName] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(taskName);
    setTaskName("");
  };

  return (
    <form>
      <input
        type="text"
        placeholder="taskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
    </form>
  );
};

export default UserTodo;
