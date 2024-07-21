import React from "react";
import { AnimatePresence } from "framer-motion";
import Todo from "./Todo";

const Todos = ({ todos, handleCheck, removeElement }) => {
  return (
    <div className="w-full h-[60vh] overflow-y-auto space-y-3 p-2 rounded bg-stone-900/40 shadow-md">
      <AnimatePresence>
        {todos.length === 0 ? (
          <p className="text-center text-xl h-full flex items-center w-full justify-center text-zinc-400">Your Task List is Empty!</p>
        ) : (
          [...todos]
            .reverse()
            .map((t) => (
              <Todo
                key={t.id}
                removeElement={removeElement}
                handleCheck={handleCheck}
                id={t.id}
                title={t.title}
                description={t.description}
                status={t.status}
                created_at={t.created_at}
              />
            ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default Todos;
