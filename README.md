# 📝 Notes Web App

A full-stack note-taking web application built with **React (Vite)** on the frontend, **Node.js/Express** on the backend, and **PostgreSQL** for the database. Organize your thoughts, tag your notes, and keep everything backed up and secure.

## 🌟 Features

- ✍️ Create, edit, and delete notes
- 🏷️ Add tags to organize your notes
- 🔍 Search notes by title, content or tags
- 👤 User authentication and session management
- 🗃️ PostgreSQL-backed data persistence
- ⚡ Fast and modern frontend using Vite
- 🎨 Responsive and clean UI

## 🛠️ Tech Stack

<p align="center" gap="50px">
  
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" width="50"/>
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" width="50"/>
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain-wordmark.svg" width="50"/>
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain-wordmark.svg" width="50"/>
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" width="50"/>
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" width="50"/>

</p>

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/notes-webapp.git
cd notes-webapp
```

### 2. Create a .env file in the projects root directory

Fill the .env file variables (You can use the example below)

```bash

DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="postgre321"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="notesdb"
DB_URL="postgresql://postgres:postgre321@db:5432/notesdb"

JWT_SECRET="dc9222bc73315eef7f677a76e8bf7109dbb6d3ef07b104f3cd19f2b888c90dedd36218f80f119e67126d4571656778a75a694b52896684ad86ebb004b53f6371"

BACKEND_PORT="3000"

FRONTEND_PORT="5173"
```

### 3. Docker Build


1. Make sure you have Docker Desktop installed and running.
2. Build and run the application using the following command: ```docker-compose up --build```


### 4. Application is up and running

Once the building process completes you can access the app at: ```http://localhost:5173/```










