# Photo Caption Contest – Backend API

This project implements a complete backend system for a photo-caption contest platform. It includes user authentication, authorization, image retrieval, caption creation, caching optimization, and full API documentation. Built using Node.js, Express, PostgreSQL, and Sequelize, the project models real-world backend workflows including database design, secure login systems, and deployment to Render.

## Tech Stack
- Node.js + Express – REST API server

- PostgreSQL – Relational database

- Sequelize ORM – Models, migrations, seeders

- bcryptjs – Secure password hashing

- cookie-session – Session-based authentication

- node-cache – Local caching layer

- Swagger – API documentation

- Render – Deployment platform

## Features

- Authentication

  - Register and login with secure password hashing

  - Session-based authentication using signed cookies

  - Login state stored securely in the session
 
- Authorization

  - Custom middleware <code>requireLogin</code>

  - Only authenticated users can submit captions

  - Prevents unauthorized access to protected endpoints

- Image Management

  - Retrieve all images

  - Retrieve a single image with its captions

  - Images seeded into the database
 
- Caption System

  - Logged-in users can submit captions tied to:

    - <code>imageId</code> (which image)

    - <code>userId</code> (which user wrote it)

  - Prevents anonymous submissions

- Performance Optimization

  - Localized caching with node-cache to reduce repeated DB queries

  - Cache invalidation when needed
 
- API Documentation

  - Swagger documentation describing schemas, endpoints, responses, and sample request bodies
 
- Deployment

  - Full deployment on Render with:

    - Production PostgreSQL

    - SSL-enabled database connections

    - Build and start commands

    - Environment variables (<code>DATABASE_URL</code>)


## Database Schema

- Users

  - username

  - password (hashed)

- Images

  - url

  - title

- Captions

  - text

  - imageId (FK → Images)

  - userId (FK → Users)
 
## Testing

API tested using Postman, including:

- Register

- Login

- Session cookie preservation

- Protected routes

- Caption creation and retrieval
