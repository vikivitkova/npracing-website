import React, { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleDone = (idx) =>
    setTasks(
      tasks.map((task, i) =>
        i === idx ? { ...task, done: !task.done } : task
      )
    );

  const removeTask = (idx) =>
    setTasks(tasks.filter((_, i) => i !== idx));

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", background: "#111", borderRadius: 8, padding: "2rem" }}>
      <h2 style={{ color: "#ffcc00" }}>To-Do List</h2>
      <form onSubmit={addTask} style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="New task"
          style={{ flex: 1, marginRight: 8, padding: 8, borderRadius: 4, border: "none" }}
        />
        <button type="submit" style={{ background: "#ffcc00", color: "#000", borderRadius: 4, fontWeight: 700 }}>Add</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, idx) => (
          <li key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(idx)}
              style={{ marginRight: 8 }}
            />
            <span style={{
              flex: 1,
              textDecoration: task.done ? "line-through" : "none",
              color: task.done ? "#888" : "#fff"
            }}>{task.text}</span>
            <button onClick={() => removeTask(idx)} style={{ marginLeft: 8, background: "none", color: "#ffcc00", border: "none" }}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}