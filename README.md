# TodoList Frontend

A modern task management application built with React and TypeScript.

## Screenshots

### Login
![Login Page](assets/login%20page.png)

### Signup
![Signup Page](assets/signup%20page.png)

### Task List
![Todo List](assets/Todo%20list.png)

## Features

- **Authentication** - User login and signup with protected routes
- **Task Management** - Create, read, update, and delete tasks
- **Categories** - Organize tasks by Work, Personal, Shopping, Health, or Other
- **Priority Levels** - Set task priority (Low, Medium, High)
- **Filters** - Filter by completion status, category, and priority
- **Search** - Search tasks by keywords
- **Pagination** - Navigate through task lists

## Tech Stack

- React 19
- TypeScript
- React Router DOM
- Bootstrap 5
- React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Application will be available at http://localhost:3000

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm test` | Run tests |
| `npm run build` | Build for production |

## Docker

See [DOCKER.md](DOCKER.md) for Docker deployment instructions.

```bash
# Quick start with Docker
docker-compose up --build

# Access at http://localhost:3001
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ErrorBoundary/
│   ├── Sidebar/
│   ├── TaskItem/
│   ├── TaskList/
│   ├── TaskModal/
│   └── common/
├── hooks/            # Custom React hooks
├── model/            # TypeScript interfaces and types
├── pages/            # Page components
│   └── auth/
└── utils/            # Utility functions
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

## CI/CD

This project uses GitHub Actions for continuous integration:

- **Test** - Runs on every push and PR
- **Build** - Builds the application after tests pass
- **Docker** - Builds and pushes Docker image to GHCR (main branch only)

## License

MIT
