# CRUD – Web Application MVP
(Spanish below)
A web application that allows users to manage learning topics and related resources, vote on useful content, and dynamically reorder items based on popularity.

The application is built with Node.js and Express, uses server-side rendering with EJS, persists data with SQLite, and handles client-side interactions using vanilla JavaScript.

---

## Features

### Topics
- Create, view, edit, and delete topics
- Vote for topics
- Automatic reordering based on vote count

### Links
- Add links inside a topic
- Edit and delete links
- Vote for links
- Automatic reordering based on votes
- Cascade deletion when a topic is removed

### Voting
- Votes are stored in the database
- Interface updates dynamically without full page reloads
- Implemented using Fetch API and vanilla JavaScript

---

## Tech Stack

- **Node.js**
- **Express**
- **SQLite**
- **EJS (Embedded JavaScript Templates)**
- **Vanilla JavaScript**
- **HTML / CSS**
- **Git**

---

## Architecture

The application follows the **MVC (Model–View–Controller)** pattern.

- **Models**
  - Handle data persistence and business logic using SQLite
  - Manage topics, links, and vote counts

- **Views**
  - Server-rendered HTML using EJS templates
  - Display lists, forms, and interactive elements

- **Controllers**
  - Handle HTTP requests and responses
  - Coordinate between models and views

### Routing
- Web routes (`/topics`) render HTML pages
- API routes (`/api/...`) return JSON and are used by frontend JavaScript for voting actions

---

## Database

The application uses **SQLite** as a lightweight relational database.

- `schema.sql` defines the database structure (tables, relations, constraints)
- `database.sqlite` stores application data at runtime
- Foreign keys ensure data integrity between topics and links
- Cascade deletion removes links automatically when a topic is deleted

---

## Project Structure
```txt
.
├── app.js
├── public/
│ ├── css/
│ │ └── styles.css
│ └── js/
│ └── votes.js
├── src/
│ ├── controllers/
│ │ └── topicPageController.js
│ ├── models/
│ │ ├── topicModel.js
│ │ └── linkModel.js
│ ├── routes/
│ │ ├── api/
│ │ │ └── voteRoutes.js
│ │ └── topicPageRoutes.js
│ ├── db/
│ │ ├── connection.js
│ │ └── schema.sql
│ └── views/
│ └── topics/
│ ├── index.ejs
│ ├── new.ejs
│ ├── show.ejs
│ ├── edit.ejs
│ └── link_edit.ejs
└── README.md
```
---

## Installation

### Requirements
- Node.js (v18 or higher recommended)

### Steps

```bash
git clone <repository-url>
cd CRUD
npm install
npm run dev
```

---

### The server will start at:
http://localhost:3000

---

## Usage:

### Topics
- Visit /topics to see all topics
- Create new topics using the provided form
- Edit or delete existing topics
- Vote topics directly from the interface

### Links
- Open a topic to view its links
- Add new links to a topic
- Edit or delete links
- Vote links individually
- All voting actions update the interface without reloading the page.


## Notes
- No frontend frameworks or external JavaScript libraries are used
- HTML forms handle CRUD operations
- JavaScript is used only for dynamic behavior (voting and reordering)
- SQLite is used as a lightweight relational database
- Foreign key constraints ensure data integrity

## Status
- Stable MVP
- Fully functional CRUD system
- Dynamic voting and reordering implemented
- Ready for local use or further extension


---

# CRUD – Aplicacion Web MVP

Aplicación web que permite gestionar temas de aprendizaje y enlaces asociados, votar contenido útil y reordenar dinámicamente los elementos según su popularidad.

Está desarrollada con Node.js y Express, renderiza vistas del lado del servidor con EJS, utiliza SQLite para persistencia y JavaScript puro para interacciones del cliente.

---

## Funcionalidades

### Temas

- Crear, ver, editar y eliminar temas
- Sistema de votación
- Reordenamiento automático por cantidad de votos

### Enlaces

- Agregar enlaces dentro de un tema
- Editar y eliminar enlaces
- Votar enlaces
- Eliminación en cascada al borrar un tema

### Votaciones

- Persistencia en base de datos
- Actualización dinámica sin recargar la página
- Implementado con Fetch API y JavaScript puro

---

## Tecnologías

- Node.js

- Express

- SQLite

- EJS

- JavaScript puro

- HTML / CSS

---

## Arquitectura

La aplicación sigue el patrón MVC (Modelo–Vista–Controlador):

Modelo: manejo de datos y lógica con SQLite

Vista: renderizado HTML con EJS

Controlador: manejo de solicitudes HTTP y conexión entre capas

Separación clara entre:

Rutas web (/topics) para HTML

Rutas API (/api/...) para respuestas JSON

---

### Instalación y Ejecución
```bash
npm install
npm run dev
```

---

### Servidor disponible en:
http://localhost:3000

---

## Uso

- Acceder a /topics para ver todos los temas
- Crear, editar y eliminar temas desde la interfaz
- Ingresar a un tema para gestionar sus enlaces
- Votar temas y enlaces sin recargar la página

## Estado

- MVP estable
- CRUD completo implementado
- Sistema de votaciones dinámico
- Código organizado y mantenible
