# Week 11: MongoDB & Authentication API

## Author
- **Name:** Kennedy Muriithi
- **GitHub:** [@muriithikennedy443-sudo](https://github.com/muriithikennedy443-sudo)
- **Date:** April 28, 2026

## Project Description
A RESTful API built with Node.js and Express that includes MongoDB database integration using Mongoose, user authentication with JWT tokens, and full CRUD operations for posts and comments. The API supports user registration, login, protected routes, and role-based authorization.

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- dotenv

## Features
- User registration and login with JWT authentication
- Password hashing with bcryptjs
- Protected routes using auth middleware
- Role-based authorization (user/admin)
- Full CRUD for posts with ownership checks
- Comments linked to posts
- User-Post relationships
- Pagination, sorting and search for posts
- Input validation with Mongoose schemas

## How to Run
1. Clone this repository
2. Install dependencies:
3. Create a `.env` file
4. Run the server

## Lessons Learned
- How to connect a Node.js app to MongoDB using Mongoose
- How to create schemas and models with validation
- How to implement JWT authentication
- How to protect routes with middleware
- How to handle relationships between models
- How to implement role-based authorization

## Challenges Faced
- Setting up MongoDB Atlas and getting the connection string
- Understanding how JWT tokens work with protected routes
- Managing relationships between User, Post and Comment models
- Handling ownership checks for edit and delete operations