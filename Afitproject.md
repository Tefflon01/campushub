# CampusHub Project Summary

This document provides a high-level overview of the CampusHub project for quick context restoration.

## Project Description

CampusHub is a modern, all-in-one web platform for students at the Air Force Institute of Technology (AFIT). It aims to enhance student life by providing tools for academic organization, collaboration, resource sharing, and a peer-to-peer marketplace.

## Technical Architecture

*   **Frontend:** React
    *   Located in the `client/` directory.
    *   Uses React Router for navigation.
    *   State management with Redux (`store.js`, `actions/`, `reducers/`, `constants/`).
    *   Styling with standard CSS and Tailwind CSS.
*   **Backend:** Node.js with Express
    *   Located in the `server/` directory.
    *   Follows an MVC-like pattern (`controllers/`, `models/`, `routes/`).
    *   Uses MongoDB for the database.
    *   Handles user authentication with JWT.
    *   Includes middleware for error handling and file uploads to Cloudinary.
*   **Database:** MongoDB

## Core Features

*   User Authentication (Login, Register, Profile Management)
*   Dashboard
*   Calendar
*   Marketplace for peer-to-peer exchange
*   Study Groups for collaboration
*   Resource Hub for sharing academic materials

## How to Run

The project is started using `npm run dev` from the root directory, which runs the client and server concurrently.
*   Client: `http://localhost:3000`
*   Server: `http://localhost:5000`

Setup involves installing npm dependencies for both the root and `client` directories and configuring environment variables in a `.env` file within the `server` directory as detailed in `README.md`.
