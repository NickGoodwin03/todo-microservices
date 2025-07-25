import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">🧩 Microservices To-Do App</h1>
      <p className="text-lg mb-6 text-white-700">
        This is a full-stack web application demonstrating a scalable architecture using microservices, JWT authentication, Docker, and a modern React frontend.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🛠️ Project Overview</h2>
        <p className="text-white-700">
          Users can register and log in securely, then create and view personal tasks. Authentication and task management are handled by separate microservices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">📦 Architecture</h2>
        <ul className="list-disc list-inside text-white-700 space-y-1">
          <li><strong>Frontend:</strong> Built with <span className="font-semibold">Next.js 14 App Router</span> and Tailwind CSS</li>
          <li><strong>API Gateway:</strong> Routes requests to backend services using <span className="font-semibold">Flask</span></li>
          <li><strong>Auth Service:</strong> Handles registration, login, and token verification with <span className="font-semibold">JWT</span></li>
          <li><strong>Task Service:</strong> Manages user-created tasks with secure authentication</li>
          <li><strong>Docker:</strong> All services are containerized and orchestrated using <span className="font-semibold">Docker Compose</span></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🔐 Authentication</h2>
        <p className="text-white-700 mb-2">
          Users log in and receive a JWT, which is stored in localStorage on the frontend and included in each authorized request. The token is verified by the auth service.
        </p>
        <ul className="list-disc list-inside text-white-700 space-y-1">
          <li>Register and login use `/auth/register` and `/auth/login` via the API Gateway</li>
          <li>JWT is attached to requests to the task service through the API Gateway</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">📝 Features</h2>
        <ul className="list-disc list-inside text-white-700 space-y-1">
          <li>User registration and login with JWT auth</li>
          <li>Session persistence using localStorage</li>
          <li>Create and view tasks</li>
          <li>Protected routes and logout functionality</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🔧 Technologies Used</h2>
        <ul className="list-disc list-inside text-white-700 space-y-1">
          <li>Next.js (React, App Router)</li>
          <li>Tailwind CSS</li>
          <li>Flask + Flask-JWT-Extended</li>
          <li>Flask-CORS</li>
          <li>Docker & Docker Compose</li>
          <li>PostgreSQL (or SQLite during development)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🚀 What’s Next?</h2>
        <ul className="list-disc list-inside text-white-700 space-y-1">
          <li>Add task completion and deletion</li>
          <li>Improve error handling and notifications</li>
          <li>Add user profile or settings page</li>
          <li>Deploy the project using Render, Railway, or Docker on a VPS</li>
        </ul>
      </section>
    </main>
  );
}
