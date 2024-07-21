"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Form from "@/components/Form";
import Todos from "@/components/Todos";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/utils/api";

const VanishList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [taskCounts, setTaskCounts] = useState({
    all: 0,
    todo: 0,
    in_progress: 0,
    done: 0,
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTodos(tasks);
        updateTaskCounts(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const updateTaskCounts = (tasks) => {
    const counts = {
      all: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      in_progress: tasks.filter((task) => task.status === "in_progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    };
    setTaskCounts(counts);
  };

  useEffect(() => {
    updateTaskCounts(todos);
  }, [todos]);

  const handleCheck = async (id, newStatus) => {
    try {
      const updatedTask = await updateTask(id, { status: newStatus });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeElement = async (id) => {
    try {
      await deleteTask(id);
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all" ? true : todo.status === filter
  );

  return (
    <section
      className="min-h-screen bg-zinc-950 py-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="mx-auto w-full max-w-xl px-4">
        <Header />
        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded bg-zinc-800 px-2 py-1 text-sm text-zinc-50 focus:outline-0"
          >
            <option value="all">All ({taskCounts.all})</option>
            <option value="todo">Todo ({taskCounts.todo})</option>
            <option value="in_progress">
              In Progress ({taskCounts.in_progress})
            </option>
            <option value="done">Done ({taskCounts.done})</option>
          </select>
        </div>
        <Todos
          removeElement={removeElement}
          todos={filteredTodos}
          handleCheck={handleCheck}
        />
      </div>
      <Form
        onCreateTask={async (task) => {
          try {
            const newTask = await createTask(task);
            setTodos((prevTodos) => [...prevTodos, newTask]);
          } catch (error) {
            console.error("Error creating task:", error);
          }
        }}
      />
    </section>
  );
};

export default VanishList;
