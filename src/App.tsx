import { useEffect, useState } from "react";
import { Header } from "./components/header";
import Tasks from "./components/tasks";
import SelectForm from "./components/selectForm";
import { TbTrash } from "react-icons/tb";
import "./styles/global.css";

// const LOCAL_STORAGE_USERS_KEY = "users";
const LOCAL_STORAGE_KEY = "todo:savedTasks";
const LOCAL_STORAGE_KEY_CATE = "todo:savedCate";

// interface User {
//   id: string;
//   username: string;
//   tasks: Task[];
// }
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
}

function App() {
  //-------------------------------------------------------------------------------------
  //GESTION DES UTILISATEURS

  //   const [users, setUsers] = useState<User[]>([]);
  //   const [currentUsername, setCurrentUsername] = useState<string>("");
  //   const [currentUserId, setCurrentUserId] = useState<string>("");
  //--------------------------------------------------------------------------------------
  //GESTION DES TASKS
  //--------------------------------------------------------------------------------------

  const [tasks, setTasks] = useState<Task[]>([]);

  //Chager les taches dans le local storage au chargement de la page
  function loadSavedTasks() {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); //converti en JSON string pr LocalStorage
    }
  }
  useEffect(() => {
    loadSavedTasks();
  }, []); //charger une seul fois

  //Charger les taches dans le local storage et sauvegarder les taches
  function setTasksandSave(newTasks: Task[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  //Ajourt une tache
  function addTask(taskTitle: string) {
    setTasksandSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
        category: selectedOption,
      },
    ]);
  }

  // Supprimer une tache
  function deleteTask(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksandSave(newTasks);
  }

  //modifierr le titre d'une tache
  function editTaskTitle(taskId: string, newTitle: string) {
    const newTasks = tasks.map((task) => {
      if (TASK.ID === taskId) {
        return {
          ...task,
          title: newTitle,
        };
      }
      return task;
    });
    setTasksandSave(newTasks);
  }

  //Modifier l'etat de completion d'une tache (true ou false)
  function toggleTaskCompleted(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      } else {
        return task;
      }
    });
    setTasksandSave(newTasks);
  }

  //--------------------------------------------------------------------------------------
  //GESTION DES CATEGORIES
  //--------------------------------------------------------------------------------------

  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  //Charger les categories dans le local storage
  function loadSavedCate() {
    const savedCate = localStorage.getItem(LOCAL_STORAGE_KEY_CATE);
    if (savedCate) {
      setOptions(Json.parse(savedCate));
    }
  }

  useEffect(() => {
    loadSavedCate();
  }, []); //charger une seul fois

  //Charger les categories dans le local dtorrage et sauvgarder les categories
  function setOptionsandSave(newOptions: string[]) {
    setOptions(newOptions);
    localStorage.setItem(LOCAL_STORAGE_KEY_CATE, JSON.stringify(newOptions));
  }

  // Gestion des options de categorie
  const [choise, setChoice] = useState<string>("All");

  //suppression de categorie
  function deleteCate(cate: string) {
    if (window.confirm(`Êtes-vous vouloir supprimer la catégorie ${cate} ?`)) {
      const newOptions = options.filter((option) => option !== cate);
      setOptionsandSave(newOptions);
      loadSavedTasks();
    }
  }
  //--------------------------------------------------------------------------------------
  //AFFICHAGE DE LA PAGE
  //--------------------------------------------------------------------------------------

  return (
    <>
      <Header onAddTask={addTask} />
      <div id="sidebar">
        <div className="logo">
          <a className="textPurple" href="/">
            My ToDoList APP
          </a>
        </div>
        <div className="nav">
          <a className="nav-item-reset" onClick={() => setChoice("All")}>
            All
          </a>
          {options.map((option) => (
            <div className="nav-item">
              <a key={option} onClick={() => setChoice(option)}>
                {option}
              </a>
              <button
                className="deleteButton"
                onClick={() => deleteCate(option)}
              >
                <TbTrash size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="container-categories">
        <h1 className="textPurple">Choisir une catégorie</h1>
        <SelectForm
          options={options}
          onOptionsChange={handleOptionsChange}
          selectedOption={selectedOption}
          onSelectedOptionChange={handleSelectedOptionChange}
        />
        <div>
          <p className="textPurple">
            Selected Category :{" "}
            <strong className="textBlue">{selectedOption}</strong>
          </p>
        </div>
      </div>
      <Tasks
        tasks={tasks}
        onComplete={toggleTaskCompleted}
        onDelete={deleteTask}
        onEdit={editTaskTitle}
        choice={choice}
      />
    </>
  );
}

export default App;
