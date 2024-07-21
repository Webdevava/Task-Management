"use client";
import React, { useEffect } from "react";
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

  const handleStatusChange = (e) => {
    handleCheck(id, e.target.value);
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
          ? "border-green-500"
          : status === "in_progress"
          ? "border-blue-700"
          : "border-zinc-700"
      }`}
    >
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
        className=" flex flex-col items-end gap-2 text-sm text-zinc-400"
      >
        <select
          value={status}
          onChange={handleStatusChange}
          className="rounded bg-zinc-800 text-sm text-zinc-50 focus:outline-0"
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={() => removeElement(id)} className="p-1 text-lg">
          <FiTrash2 className="text-red-500" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Todo;
