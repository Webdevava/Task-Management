import React from "react";

const Header = () => {
  const now = new Date();

  const getGreeting = () => {
    const hours = now.getHours();
    if (hours < 12) {
      return "Good morning! ☀️";
    } else if (hours < 18) {
      return "Good afternoon! 🌞";
    } else {
      return "Good evening! 🌜";
    }
  };

  const getTimeOfDay = () => {
    const hours = now.getHours();
    if (hours < 12) {
      return "morning";
    } else if (hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="mb-6">
      <h1 className="text-xl font-medium text-white">{getGreeting()}</h1>
      <p className="text-zinc-400">
        Let's see what we've got to do this {getTimeOfDay()}.
      </p>
      <p className="text-zinc-500 mt-2">
        {formatDate(now)} | {formatTime(now)}
      </p>
    </div>
  );
};

export default Header;
