"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  rectIntersection,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Form from "@/components/Form";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/utils/api";

const statuses = ["todo", "in_progress", "done", "delete"];

const VanishList = () => {
  const [todos, setTodos] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    todo: 0,
    in_progress: 0,
    done: 0,
  });
  const [activeId, setActiveId] = useState(null);

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
      todo: tasks.filter((task) => task.status === "todo").length,
      in_progress: tasks.filter((task) => task.status === "in_progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    };
    setTaskCounts(counts);
  };

  useEffect(() => {
    updateTaskCounts(todos);
  }, [todos]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const task = todos.find((t) => t.id === active.id);

    if (over.id === "delete") {
      try {
        await deleteTask(task.id);
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== task.id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    } else {
      const updatedTask = { ...task, status: over.id };
      try {
        await updateTask(task.id, { status: updatedTask.status });
        setTodos((prevTodos) => {
          const updatedTodos = prevTodos.filter((t) => t.id !== task.id);
          return [...updatedTodos, updatedTask];
        });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }

    setActiveId(null);
  };

  const getColumnTasks = (status) =>
    todos.filter((task) => task.status === status);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-zinc-950 py-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <Header />
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={(event) => setActiveId(event.active.id)}
          collisionDetection={rectIntersection}
        >
          <motion.div className="flex flex-wrap gap-4" layout>
            {statuses.map((status) => (
              <DroppableContainer key={status} id={status}>
                <h2 className="text-xl font-semibold text-zinc-50 mb-4 capitalize">
                  {status.replace("_", " ")}
                  {status !== "delete" && ` (${taskCounts[status] || 0})`}
                </h2>
                <AnimatePresence>
                  {status !== "delete" &&
                    getColumnTasks(status).map((task) => (
                      <DraggableItem key={task.id} id={task.id}>
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-zinc-700 p-4 rounded mb-2 cursor-move"
                        >
                          <h3 className="text-lg text-zinc-50">{task.title}</h3>
                          <p className="text-sm text-zinc-400">
                            {task.description}
                          </p>
                        </motion.div>
                      </DraggableItem>
                    ))}
                </AnimatePresence>
              </DroppableContainer>
            ))}
          </motion.div>
          <DragOverlay>
            {activeId ? (
              <motion.div
                initial={{ opacity: 0.8, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-700 p-4 rounded shadow-lg"
              >
                {todos.find((task) => task.id === activeId)?.title}
              </motion.div>
            ) : null}
          </DragOverlay>
        </DndContext>
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
      </div>
    </motion.section>
  );
};

const DroppableContainer = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      layout
      className={`flex-1 min-w-[200px] p-4 rounded ${
        id === "delete"
          ? "bg-red-800 text-white border-2 border-red-600"
          : "bg-zinc-800"
      }`}
      style={{ minHeight: "200px" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default VanishList;
