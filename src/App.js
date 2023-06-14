import React from "react";

//containers
import Header from "./container/Header";

import TodoList from "./container/TodoList";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
