# Tikech University Incident Portal

A simple proof-of-concept web platform for campus incident ticket creation and tracking.

## Backend

Technology: Spring Boot, H2, Spring Data JPA

Run from `backend`:

```powershell
cd backend
mvn spring-boot:run
```

The API is available at `http://localhost:8081/api/tickets`.

## Frontend

Technology: React + Vite

Run from `frontend`:

```powershell
cd frontend
npm install
npm run dev
```

Open the local Vite URL in your browser (default `http://localhost:5173`).

## Features

- Create incident tickets with category, priority, description, and contact details
- Upload up to 3 images as evidence
- Ticket workflow states: `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`, `REJECTED`
- Assign a technician and add resolution notes
- Add comments with author ownership

## Notes

- No login or admin views are included; this is a user-facing incident reporting interface.
- Data is stored in an in-memory H2 database and will reset when the backend restarts.
