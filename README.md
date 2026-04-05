# FeedPulse Application

This repository contains a full-stack application built with **Express.js** (backend) and **Next.js 14** (frontend). The project is structured with separate `backend` and `frontend` folders.

![Landing Page](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/landing.png)

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) running locally or remotely

---

## Setup

### 1. Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Copy the example environment file and update the values:

```bash
cp .env.example .env
```

3. Edit .env to match your environment:

4. Install dependencies:

```bash
npm install
```

5. Start the backend server:

```bash
npm run dev
```

6. Create a admin user using swagger:

```
Swagger-docs: http://localhost:8080/api-docs
```

### 2. Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Copy the example environment file and update the API URL:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start the frontend:
```bash
npm run dev
```

### 3. Gemini-3-flash-preview

- Get Gemini-3-flash-preview model key by visting this official site:
- https://aistudio.google.com


## Screenshots

### Create Feedback
![Create Feedback](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/submit_feedback.png)

### Login Page
![Login Page](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/login.png)

### Home
![Home](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/home.png)

### Feedback List
![Feedback List](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/feedbacks.png)

### Feedback View
![Feedback View](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/feedback.png)

### Light Mode
![Home View](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/light_mode.png)

![Feedbacks View](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/light_mode_2.png)

![Feedback View](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/light_mode_3.png)

### Swagger
![Feedback View](https://github.com/KNR1997/FeedPulse/blob/main/frontend/public/screenshots/swagger.png)