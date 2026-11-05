# EMS Application Run Instructions

This document explains how to run the Employee Management System frontend and backend locally.

## 1. Prerequisites

Before running the app, make sure the following are installed on your machine:

- Node.js and npm
- Java 17+
- Maven

### Verify installation

```bash
node -v
npm -v
java -version
mvn -v
```

If Maven is not installed, install it before starting the backend.

## 2. Start the Backend

Open a terminal in the project root and run:

```bash
cd backend
mvn spring-boot:run
```

The backend runs on:

- http://localhost:8080

If the app starts successfully, you should see Spring Boot startup logs ending with:

```text
Tomcat started on port 8080
Started EmsApplication
```

## 3. Start the Frontend

Open a second terminal in the project root and run:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

The frontend runs on:

- http://localhost:5173/

## 4. Access the Application

Open the browser and go to:

```text
http://localhost:5173/
```

## 5. Login Credentials

Use the following demo login credentials:

- Email: hemanth@gmail.com
- Password: Director@2026

The backend accepts this login and redirects to the dashboard after successful authentication.

## 6. Common Troubleshooting

### Backend port already in use

If port 8080 is already occupied, stop the old Java process and start again.

On macOS/Linux:

```bash
lsof -i :8080
kill <PID>
```

Then run:

```bash
cd backend
mvn spring-boot:run
```

### Frontend not loading

Make sure dependencies are installed:

```bash
npm install
```

Then start dev server again:

```bash
npm run dev -- --host 0.0.0.0
```

### Maven command not found

Install Maven and add it to PATH, then verify with:

```bash
mvn -v
```

## 7. Project Structure Summary

- `backend/` — Java Spring Boot API
- `src/` — React frontend
- `public/` — static frontend assets

## 8. Production Notes

This project is set up as a local development environment. For a production deployment, consider:

- Secure database integration
- JWT or session-based authentication
- Environment variables for secrets
- Frontend deployment to Vercel / Netlify / S3 + CloudFront
- Backend deployment to EC2 / ECS / Azure / AWS container services
