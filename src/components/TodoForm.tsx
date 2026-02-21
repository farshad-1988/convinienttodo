"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../slice/todoSlice";
import { toLocalDateString } from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import type { Task } from "../types/types";

const getDefaults = () => {
  const now = new Date();

  // Create a copy of 'now' to avoid mutating the original date
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  return {
    startDate: toLocalDateString(now),
    dueDate: toLocalDateString(tomorrow),
  };
};

export default function TodoForm() {
  const navigate = useNavigate();
  const { startDate: defaultStart, dueDate: defaultDue } = getDefaults();
  const [subject, setSubject] = useState("");
  const [explain, setExplain] = useState("");
  const [startDate, setStartDate] = useState(defaultStart);
  const [dueDate, setDueDate] = useState(defaultDue);
  const dispatch = useDispatch();
  //add validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const todoData: Task = {
      id: nanoid(),
      subject,
      explain,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      dateCreated: new Date(),
      status: "pending",
    };

    try {
      dispatch(addTodo(todoData));
      setSubject("");
      setExplain("");
      setStartDate("");
      setDueDate("");
      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  const inputClass =
    "w-full bg-gray-800 border border-gray-600 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 transition";

  const labelClass = "block text-sm font-medium mb-1 text-gray-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-900 border border-gray-700 shadow-xl rounded-xl space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-100 tracking-tight">
        New Todo
      </h2>

      <div>
        <label className={labelClass}>Subject</label>
        <input
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Explanation</label>
        <textarea
          required
          value={explain}
          onChange={(e) => setExplain(e.target.value)}
          placeholder="Describe the task..."
          className={`${inputClass} h-24 resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`${inputClass} [color-scheme:dark]`}
          />
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            value={dueDate}
            min={startDate || undefined}
            onChange={(e) => setDueDate(e.target.value)}
            className={`${inputClass} [color-scheme:dark]`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 transition font-medium tracking-wide"
      >
        Add Todo
      </button>
    </form>
  );
}
