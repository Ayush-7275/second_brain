# Second Brain Backend API

A RESTful backend service built with **Node.js**, **Express**, and **TypeScript** for a "Second Brain" application. This API allows users to create accounts, save various types of content (links, videos, articles), and generate public shareable links to their knowledge base.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Bcrypt (Password Hashing)
- **Validation:** Zod

## 📂 Project Structure

- **`index.ts`**: The main entry point. Initializes the server, connects to the database, and defines all API routes.
- **`db.ts`**: Mongoose schemas and models (`Users`, `Content`, `Tags`, `Links`).
- **`middleware.ts`**: Contains the `verifying` middleware for JWT authentication.
- **`secret.ts`**: Configuration file for database connection strings and secrets.

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
