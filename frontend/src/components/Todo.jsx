"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimate, usePresence } from "framer-motion";
import { FiClock, FiTrash2 } from "react-icons/fi";

const Todo = ({
  removeElement,
  handleCheck,
  id,
  title,
  description,
  status,
  created_at,
}) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          "p",
          {
            color: status === "done" ? "#6ee7b7" : "#fca5a5",
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );
        await animate(
          scope.current,
          {
            scale: 1.025,
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: status === "done" ? 24 : -24,
          },
          {
            delay: 0.75,
          }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  useEffect(() => {
    // This effect will run whenever `status`, `title`, or `description` changes
    animate(
      scope.current,
      {
        opacity: 1,
        scale: 1,
      },
      {
        ease: "easeOut",
        duration: 0.3,
      }
    );
  }, [status, title, description]);

  const handleStatusChange = async (e) => {
    setLoading(true); // Set loading state to true
    try {
      await handleCheck(id, e.target.value); // Await handleCheck
    } catch (error) {
      console.error("Error changing status:", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleRemove = async () => {
    setLoading(true); // Set loading state to true
    try {
      await removeElement(id); // Await removeElement
    } catch (error) {
      console.error("Error removing task:", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const timeAgo = (date) => {
    const now = new Date();
    const createdDate = new Date(date);
    const diffInSeconds = Math.floor((now - createdDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <motion.div
      ref={scope}
      layout
      className={`relative flex w-full justify-between items-end gap-3 rounded border-l-4 bg-zinc-900 p-3 ${
        status === "done"
          ? "border-green-400"
          : status === "in_progress"
          ? "border-blue-400"
          : "border-zinc-400"
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-400"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <h3
              className={`text-white font-bold ${
                status === "done" ? "line-through text-zinc-400" : ""
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-sm text-zinc-400 ${
                status === "done" ? "line-through text-zinc-500" : ""
              }`}
            >
              {description}
            </p>
            <p className="text-xs mt-2 text-zinc-500">{timeAgo(created_at)}</p>
          </div>
          <motion.div
            layout
            className="flex flex-col items-end gap-2 text-sm text-zinc-400"
          >
            <select
              value={status}
              onChange={handleStatusChange}
              className="rounded bg-zinc-800 text-sm text-zinc-50 focus:outline-0"
              disabled={loading} // Disable select when loading
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button
              onClick={handleRemove}
              className="p-1 text-lg"
              disabled={loading} // Disable button when loading
            >
              <FiTrash2 className="text-red-500" />
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Todo;
