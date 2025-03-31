import { useState } from "react";

import Modal from "./Modal";
import List from "./List";

import type { MainTools } from "../types";

const Main: React.FC<MainTools> = ({ todos, setTodos, todo, setTodo, tab, setTab }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div id='items'>
      <main>
        <Modal todos={todos}
               setTodos={setTodos}
               todo={todo}
               setTodo={setTodo}
               checked={checked}
               setChecked={setChecked}
               tab={tab}
               setTab={setTab} />
        <List todos={todos}
              setTodos={setTodos}
              setTodo={setTodo}
              checked={checked}
              setChecked={setChecked}
              tab={tab}
              setTab={setTab}/>
      </main>
    </div>
  );
}

export default Main;