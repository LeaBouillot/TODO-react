import { useState } from "react";
import { Header } from "./components/header";
import { SelectForm } from "./components/selectForm";
import Tasks from "./components/tasks";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
}

function App() {
  const [Tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <Header />
      <div>
        <div>
          <a href=""></a>
        </div>

        <div>
          <a href=""></a>
          <a href="">
            <button></button>
          </a>
        </div>
      </div>

      <div>
        <h1>Catégorie</h1>
        <SelectForm />
        <div>
          <p>Selec Catégory</p>
        </div>
      </div>

      <Tasks />
    </>
  );
}

export default App;
