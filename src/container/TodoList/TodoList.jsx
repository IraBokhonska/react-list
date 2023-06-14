import React, { useState, useEffect } from "react";

//assets
import "../../assets/container/todo-list.scss";
import { FaCheck } from "react-icons/fa";

const TODO_LIST = [
  {
    task: "Create the portfolio",
    completed: false,
  },
  {
    task: "Create a new todo...",
    completed: false,
  },
  {
    task: "Create a new todo...",
    completed: false,
  },
  {
    task: "Create a new todo...",
    completed: false,
  },
  {
    task: "Create a new todo...",
    completed: false,
  },
];

function TodoList() {
  const [task, setTask] = useState("add your task");
  const [tasksToDisplay, setTasksToDisplay] = useState(TODO_LIST);
  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    const savedList = localStorage.getItem("tasksToDisplay");

    if (savedList) {
      const listToSave = JSON.parse(savedList);

      setTasksToDisplay(listToSave);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasksToDisplay", JSON.stringify(tasksToDisplay));
  }, [tasksToDisplay]);

  useEffect(() => {
    setTasksCount(tasksToDisplay.length);
  }, [tasksToDisplay]);

  //додати до списку новий ел.

  const handleSubmit = (e) => {
    e.preventDefault(); //щоб сторінка не перезагружалася

    setTasksToDisplay([...tasksToDisplay, { task: task }]);
  };

  //викреслити елемент зі списку

  const handleToggle = (index) => {
    const updatedTasks = [...tasksToDisplay];

    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasksToDisplay(updatedTasks);
  };

  //очистити тільки викреслені елементи

  const handleClearComplete = () => {
    const incompleteTasks = tasksToDisplay.filter((task) => !task.completed);
    setTasksToDisplay(incompleteTasks);
  };

  return (
    <section className="todo">
      <form action="" className="todo__form" onSubmit={handleSubmit}>
        <input
          className="todo__input"
          type="text"
          name="task"
          value={task}
          placeholder="Create a new todo..."
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="todo__add" type="submit">
          <svg
            width="56"
            height="33"
            viewBox="0 0 56 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.8394 2.50969C38.8238 2.79836 41.5346 12.2524 41.3919 16.9433"
              stroke="white"
              strokeWidth="4"
            />
            <line
              x1="0.828796"
              y1="2.14552"
              x2="29.9339"
              y2="2.14552"
              stroke="white"
              strokeWidth="4"
            />
            <path
              d="M39.8439 32.0585C40.6249 32.8523 41.891 32.8729 42.672 32.1046L55.3982 19.5841C56.1791 18.8158 56.1791 17.5495 55.3982 16.7557C54.6172 15.9619 53.3511 15.9413 52.5701 16.7096L41.2579 27.8389L29.9457 16.3408C29.1648 15.547 27.8986 15.5263 27.1177 16.2947C26.3367 17.063 26.3367 18.3293 27.1177 19.1231L39.8439 32.0585ZM39.2582 15.4553L39.2582 30.6347L43.2577 30.6999L43.2577 15.5205L39.2582 15.4553Z"
              fill="white"
            />
          </svg>
        </button>
      </form>
      <ul className="todo-list">
        {tasksToDisplay.map((item, index) => {
          return (
            <li className="todo-list__item" key={`todo-list__item_${index}`}>
              <div
                className={`todo-list__check ${
                  item.completed ? "completed" : "" // клас "completed" для закреслення тексту
                }`}
                onClick={() => handleToggle(index)} // виклик handleToggle при кліку
              >
                <FaCheck className="icon" />
              </div>
              <p
                className={`todo-list__text ${
                  item.completed ? "completed" : ""
                }`}
              >
                {item.task}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="todo__summery">
        <div className="counter">{`${tasksCount} Items`}</div>
        <div className="clear" onClick={handleClearComplete}>
          Clear Complete
        </div>
      </div>
    </section>
  );
}

export default TodoList;
