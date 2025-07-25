"use client";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/app/context/AuthContext";


export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const router = useRouter()
  const { isAuthenticated, login } = useAuthContext()

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setTasks(data || []);
    else alert("Failed to load tasks");
  };

  const createTask = async () => {
    const token = localStorage.getItem("token");
    if (!newTask.trim()) return alert("Task title cannot be empty");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask }),
    });

    const data = await res.json();
    if (res.ok) {
      setNewTask("");
      fetchTasks(); // Refresh task list
    } else {
      alert(data.msg || "Failed to create task");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
        fetchTasks();
    } else {
      router.replace('/');
    }

  }, [isAuthenticated, router]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="New task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border px-2 py-1 w-full mb-2"
        />
        <button
          onClick={createTask}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Create Task
        </button>
      </div>

      <ul>
        {tasks.map((task: any, idx) => (
          <li key={idx} className="border p-2 mb-2 rounded bg-black shadow text-white">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
