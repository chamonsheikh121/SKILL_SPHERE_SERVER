# Skill Sphere Frontend
 - Front-end URL : https://skills-sphere-frontend.vercel.app/ 


# Skill Sphere Server
A complete backend API server for the Skill Sphere e-learning platform.  

Skill Sphere Server powers user management, course and batch handling, payments, and secure authentication for an online learning environment. Built with modern technologies and best practices to ensure scalability, security, and performance.

---

## Description
Skill Sphere Server is a Node.js and Express-based backend that manages all aspects of an e-learning platform. The system provides:

- User authentication with JWT
- Email verification and password reset
- Course and batch management
- Payment integration with SSL Commerz
- File uploads and media handling
- Role-based access control (student, admin, instructor)
- Input validation using Zod
- Scalable RESTful APIs

This backend forms the foundation of the Skill Sphere platform, enabling both web and mobile clients to function efficiently.

---

## Features
- **User Authentication:** Secure login, registration, email verification, and password reset/change functionalities.  
- **Course Management:** Create, read, update, and delete courses and batches with flexible enrollment periods and participant limits.  
- **Payments:** Handle payments securely using SSL Commerz with transaction tracking.  
- **File Handling:** Upload and serve course images and videos through dedicated static routes.  
- **Input Validation:** Zod schemas ensure all incoming requests are properly validated.  
- **Role-based Access Control:** Admin, instructor, and student roles with fine-grained permissions.  
- **Notifications:** Email notifications for verification and payment confirmations.  
- **Clean API Design:** RESTful endpoints for all operations.

---

## Technologies Used
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Nodemailer for email services
- Multer for file uploads
- Zod for request validation
- SSL Commerz for payment integration

---

## API Overview

### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login` | Login a user |
| POST   | `/api/v1/auth/change-password` | Change user password |
| POST   | `/api/v1/auth/forgot-password` | Send password reset link |
| GET    | `/api/v1/auth/verify-email` | Verify user email |

### Courses & Batches
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/v1/courses` | Create a new course |
| GET    | `/api/v1/courses` | List all courses |
| POST   | `/api/v1/batches` | Create a new batch |
| GET    | `/api/v1/batches` | List all batches |

### Payments
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/v1/payments/initiate` | Initiate a payment |
| POST   | `/api/v1/payments/callback` | Payment callback endpoint |

---



---

## Author
Chamon Ali – [GitHub](https://github.com/chamonsheikh121)

---

## Notes
- This README is intended for clients and reviewers to understand the project features, APIs, and technology stack.  
- No installation or `.env` instructions are included to keep sensitive information private.
