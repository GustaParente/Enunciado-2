import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Profile from "./assets/profile.png";
import Sun from "./assets/sun.svg";
import Moon from "./assets/moon.svg";

const TodoList = () => {
  // Recuperar dados do localStorage ao inicializar o componente
  const getLocalStorageData = (key, defaultValue) => {
    try {
      const storedData = localStorage.getItem(key);

      // Verificar se os dados estão presentes para não ter o erro undefined
      return storedData ? JSON.parse(storedData) : defaultValue;
    } catch (error) {
      console.error(
        `Erro ao fazer o parse dos dados do localStorage: ${error}`
      );
      return defaultValue;
    }
  };

  const [dayTasks, setDayTasks] = useState(getLocalStorageData("dayTasks", []));
  const [nightTasks, setNightTasks] = useState(
    getLocalStorageData("nightTasks", [])
  );

  const [newDayTask, setNewDayTask] = useState("");
  const [newNightTask, setNewNightTask] = useState("");

  // Atualizar localStorage sempre que as listas de tarefas mudarem
  useEffect(() => {
    localStorage.setItem("dayTasks", JSON.stringify(dayTasks));
  }, [dayTasks]);

  useEffect(() => {
    localStorage.setItem("nightTasks", JSON.stringify(nightTasks));
  }, [nightTasks]);

  // Função de adicionar as tarefas
  const handleAddTask = (listType) => {
    let newTask;
    if (listType === "day") {
      newTask = newDayTask;
      setNewDayTask("");
      setDayTasks([...dayTasks, newTask]);
    } else if (listType === "night") {
      newTask = newNightTask;
      setNewNightTask("");
      setNightTasks([...nightTasks, newTask]);
    }
  };

  // Função de excluir as tarefas
  const handleRemoveTask = (listType, index) => {
    if (listType === "day") {
      const updatedDayTasks = [...dayTasks];
      updatedDayTasks.splice(index, 1);
      setDayTasks(updatedDayTasks);
    } else if (listType === "night") {
      const updatedNightTasks = [...nightTasks];
      updatedNightTasks.splice(index, 1);
      setNightTasks(updatedNightTasks);
    }
  };

  // Conteúdo da página que será retornado on load
  return (
    <div>
      <div className="main">
        <div className="left">
          <img className="picture" src={Profile} alt="Foto de perfil" />
          <h2 className="name">Gustavo Parente</h2>
          <p className="description">
            Parágrafo de teste para ter algo escrito abaixo da foto e do nome
            fictício (que eu acabei colocando meu próprio nome). Abaixo deste
            parágrafo estão os quatro links formatados e estilizados de um jeito
            simples, porém visualmente agradável.
          </p>
          <ul className="menu">
            <li>
              <a href="#"></a>Link 1
            </li>
            <li>
              <a href="#"></a>Link 2
            </li>
            <li>
              <a href="#"></a>Link 3
            </li>
            <li>
              <a href="#"></a>Link 4
            </li>
          </ul>
        </div>
        <div className="right">
          <h1 className="title">Lista de Tarefas</h1>
          <div className="tasks">
            <div className="day">
              <h2 className="dayTitle">
                Tarefas do Dia
                <img className="sun" src={Sun} alt="Sol" />
              </h2>
              <ol>
                {dayTasks.map((task, index) => (
                  <li className="list" key={index}>
                    {task}
                    <button
                      className="removeBtn"
                      onClick={() => handleRemoveTask("day", index)}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ol>
              <input
                className="inputTask"
                type="text"
                placeholder="Digite sua tarefa aqui"
                value={newDayTask}
                onChange={(e) => setNewDayTask(e.target.value)}
              />
              <button
                className="btnAddTask"
                onClick={() => {
                  // Verificar se o campo não está vazio antes de adicionar a tarefa
                  if (newDayTask.trim() !== "") {
                    handleAddTask("day");
                  } else {
                    alert("Digite uma tarefa antes de adicionar!");
                  }
                }}
              >
                Adicionar Tarefa
              </button>
            </div>
            <div className="night">
              <h2 className="nightTitle">
                Tarefas da Noite
                <img className="moon" src={Moon} alt="Lua" />
              </h2>
              <ol>
                {nightTasks.map((task, index) => (
                  <li className="list" key={index}>
                    {task}
                    <button
                      className="removeBtn"
                      onClick={() => handleRemoveTask("night", index)}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ol>
              <input
                className="inputTask"
                type="text"
                placeholder="Digite sua tarefa aqui"
                value={newNightTask}
                onChange={(e) => setNewNightTask(e.target.value)}
              />
              <button
                className="btnAddTask"
                onClick={() => {
                  // Verificar se o campo não está vazio antes de adicionar a tarefa
                  if (newNightTask.trim() !== "") {
                    handleAddTask("night");
                  } else {
                    alert("Digite uma tarefa antes de adicionar!");
                  }
                }}
              >
                Adicionar Tarefa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
