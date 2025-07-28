# Microservices To-Do App
This is a full-stack web application demonstrating a scalable architecture using microservices, JWT authentication, Docker, and a modern React frontend.

## Project Overview
Users can register and log in securely, then create and view personal tasks. Authentication and task management are handled by separate microservices.

## Architecture
- Frontend: Built with Next.js 14 App Router and Tailwind CSS

- API Gateway: Routes requests to backend services using Flask

- Auth Service: Handles registration, login, and token verification with JWT

- Task Service: Manages user-created tasks with secure authentication

- Docker: All services are containerized and orchestrated using Docker Compose

## Authentication
- Users log in and receive a JWT, which is stored in localStorage on the frontend and included in each authorized request. The token is verified by the auth service.

- Register and login use /auth/register and /auth/login via the API Gateway

- JWT is attached to requests to the task service through the API Gateway

## Features
- User registration and login with JWT auth

- Session persistence using localStorage

- Create and view tasks

- Protected routes and logout functionality

## Technologies Used
- Next.js (React, App Router)

- Tailwind CSS

- Flask + Flask-JWT-Extended

- Flask-CORS

- Docker & Docker Compose

- PostgreSQL (or SQLite during development)

## What’s Next?
- Add task completion and deletion

- Improve error handling and notifications

- Add user profile or settings page

- Deploy the project using Render, Railway, or Docker on a VPS

- Improved security (Sanitized inputs, Role based access, Use email to complete account creation, ect.)