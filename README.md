# Créer une application de ToDo list avec React

## Étape 1

On créé un projet vite avec React + TypeScript

`pnpm create vite` ou `npm create vite@latest`

## Étape 2

On initialise le tracking git

`git init`, puis `git add .` et `git commit -m "Initial commit"`

Sur VSCode, on peut directement pusher le projet sur GitHub. Rappel, sur VSCode vous pouvez utiliser l'interface "Source control" (Contrôle de source) pour gérer vos commits sans passer par le terminal.

## Étape 3

On fait le ménage dans le projet en supprimant le style et les assets ainsi que l'affichage dans le fichier App.tsx

## Étape 4

On organise les fichiers et l'architecture du projets, dans notre cas, on créé un dossier components pour y placer nos components, un dossier styles pour les styles et un dossier assets pour les assets.

## Étape 5

On écrit les différentes fonctions dont nous avons besoin pour créer une application de ToDo list avec React.
Puis on utiliser les props pour passer les données à nos composants.

```typescript	
<Tasks 
      tasks={tasks}
      onComplete={toggleTaskCompleted}
      onDelete ={deleteTask}
      onEdit={editTaskTitle} 
      choice={choice}
      />

<SelectForm
        options={options}
        onOptionsChange={handleOptionsChange}
        selectedOption={selectedOption}
        onSelectedOptionChange={handleSelectedOptionChange}
      />
```

## Étape 6

Typage des données et des fonctions dans les composants qui ont été reçu grâce aux props.

```typescript	
//Typage des objets Tasks
interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    category: string;
}

//Typage des Props
interface TasksProps {
    tasks: Task[];
    onComplete: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onEdit: (taskId: string, newTitle: string) => void;
    choice: string;
}

export default function Tasks({ tasks, onComplete, onDelete, onEdit, choice }: TasksProps) {}
```

## Étape 7

Utilisation des données et des fonctions reçus grâce aux props dans le composant Tasks puis dans le composant Task on utilise à nouveau les props pour passer les données à nos composants.

```typescript	>
<Task 
      task={task}
      onComplete={onComplete}
      onDelete={onDelete}
      onEdit={onEdit}
      />
```

## Étape 8

On ajoute un bouton de suppression dans le composant Task et ainsi de suite pour utiliser toutes nos fonctions créées dans le fichier App.tsx.
On utilise également les données transferés pour les afficher dans la page. 

```typescript	>
<button className="deleteButton" onClick={() => onDelete(task.id)}>
    <TbTrash size={20} />
</button>
```	

## Étape 9

On y rajoute du style pour rendre l'application agréable à utiliser.

```css	>
.container-categories {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#sidebar {
  width: 20%;
  height: 100vh;
  background-color: #f5f5f5;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```	

## Étape 10

On créé ensuite toutes les fonctions annexes nécessaires pour la gestion des catégories.

```typescript	>
//Charger les catégories dans le local Storage
function loadSavedCate() {
    const savedCate = localStorage.getItem(LOCAL_STORAGE_KEY_CATE);
    console.log(savedCate);
    if(savedCate) {
      setOptions(JSON.parse(savedCate));
    }
  }

useEffect(() => {
    loadSavedCate();
  }, []);
  
//Charger les catégories dans le local Storage et sauvegarder les catégories
function setOptionsandSave(newOptions: string[]) {
    setOptions(newOptions);
    localStorage.setItem(LOCAL_STORAGE_KEY_CATE, JSON.stringify(newOptions));
  }
  ```	

## Étape 11

On ajoute ensuite les fonctions annexes pour trier les fonctins par catégories, filter les tâches par champ de recherche. On rajoute égelement un compteur pour les tâches terminées et non terminées. 
