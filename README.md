# Kokoro TTS Web App

# Installation:

# Prerequisites:
1) Python 3.8+
2) Node.js (for the frontend)

1. Backend Setup (Python)
Navigate to the backend folder and install the required AI libraries.

Bash

cd backend

# Install dependencies
pip install fastapi uvicorn kokoro soundfile numpy torch phonemizer

# Start the API server
uvicorn main:app --reload

The backend runs on http://127.0.0.1:8000.

2. Frontend Setup (React)
Open a new terminal, navigate to the frontend folder, and install the UI dependencies.

Bash

cd frontend

# Install dependencies
npm install

# Start the web interface
npm run dev

The frontend runs on http://localhost:5173.

#Available Voices:

The app includes the full suite of Kokoro v1.0 voices:

<img width="823" height="529" alt="image" src="https://github.com/user-attachments/assets/f9ba2c93-7bee-470d-b46a-685f3b10f264" />



