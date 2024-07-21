"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const Form = ({ onCreateTask }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newTodo = {
      title,
      description,
      status,
      created_at: new Date().toISOString(),
    };

    try {
      await onCreateTask(newTodo);

      // Clear form fields
      setTitle("");
      setDescription("");
      setStatus("todo");
      setError("");
      setVisible(false); // Close the form after successful submission
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
      <AnimatePresence>
        {visible && (
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            onSubmit={handleSubmit}
            className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="mb-2 w-full rounded bg-zinc-900 p-2 text-md text-zinc-50 placeholder-zinc-500 focus:outline-0"
            />
            <hr className="border-zinc-700" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="mb-2 h-24 w-full resize-none rounded bg-zinc-900 p-2 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
            />

            <div className="flex items-center justify-between">
              <div className="mb-2 flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="rounded bg-zinc-700 px-2 py-1 text-sm text-zinc-50 focus:outline-0"
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <button
                type="submit"
                className="rounded bg-indigo-600 px-1.5 py-1 text-sm text-indigo-50 transition-colors hover:bg-indigo-500"
              >
                Submit
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={() => setVisible((pv) => !pv)}
        className="w-full flex justify-center gap-2 items-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
      >
        <FiPlus
          className={`transition-transform ${
            visible ? "rotate-45" : "rotate-0"
          }`}
        />
        {visible ? "Close" : "Add a Task"}
      </button>
    </div>
  );
};

export default Form;
