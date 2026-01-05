import Tasks from "./components/Tasks.jsx";
import AddTasks from "./components/AddTasks.jsx";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
  // Lista de tarefas inicial
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     title: "Estudar React",
  //     description: "Ler a documentação oficial do React",
  //     isCompleted: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Fazer compras",
  //     description: "Comprar frutas, verduras e leite",
  //     isCompleted: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Ler um livro",
  //     description: "Ler 'O Senhor dos Anéis'",
  //     isCompleted: false,
  //   },
  // ]);

  // Lista de Tarefas usando o localStorage
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  //Conectando e carregando tarefas via API
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       { method: "GET" }
  //     );
  //     const data = await response.json();
  //     setTasks(data);
  //   };
  //   fetchTasks();
  // }, []);

  // Salvar os dados no localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Atualizar a Tarefa
  function onTaskClick(taskID) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskID) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });
    setTasks(newTasks);
  }

  // Deletar Tarefa
  function onDeleteTaskClick(taskID) {
    const newTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(newTasks);
  }

  // Adicionar Tarefa
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  // Componetes da Tela
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
