# Express Postals

Express Postals is a logistics and shipment management platform for businesses that need to coordinate parcel pickups, deliveries, and tracking in a single place. The app combines a customer-facing order flow with an admin dashboard for managing shipment records, updating delivery status, and monitoring recent activity.

## What this project does

This project is built around a simple shipping workflow:

- Customers can request a delivery or pickup from the public landing page.
- They can enter sender and recipient details and submit a shipment request.
- Each shipment receives a unique tracking ID and can be tracked through the public tracking endpoint.
- Admins can log in, view shipments, filter by status, add new shipments, update statuses, and remove outdated records.
- The app uses MongoDB to persist shipment and user data, with Express APIs powering the backend.

## Core features

- Public shipment request flow with sender/recipient information
- Tracking by unique shipment ID
- Secure admin authentication and session-based access
- Shipment dashboard with status filtering and pagination
- Shipment status updates such as pending, in transit, delivered, and cancelled
- Contact and informational pages for a logistics brand site
- Responsive Next.js frontend with a modern business-oriented design

## Tech stack

- Next.js 15 for the frontend and routing
- Express.js for API routes and server logic
- MongoDB + Mongoose for persistence
- Tailwind CSS and Bootstrap for styling
- Session-based authentication with Express sessions and MongoDB storage
- Joi for validation
- Helmet, rate limiting, and sanitization middleware for basic security

## Project structure

```bash
.
├── components/           # Reusable frontend components
├── lib/                  # Database and session helpers
├── models/               # Mongoose schemas
├── public/               # Static assets and branding files
├── routes/               # Express API endpoints
├── src/                  # Next.js app source and dashboard UI
├── server.js             # Express + Next server bootstrap
├── package.json          # App scripts and dependencies
├── README.md             # Project documentation
└── .env                  # Local environment configuration
```

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env
```

If there is no `.env.example`, create a `.env` file with values similar to:

```bash
MONGODB_URI=mongodb://localhost:27017/express_postals
PORT=3000
NODE_ENV=development
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:3000
```

## Admin setup

Before the dashboard can be used, create the first admin account through the app's setup flow, typically from the `/setup-admin` route. After that, use the login screen to access the dashboard.

## Production notes

This project is configured to run as a single Express + Next.js server with MongoDB as the data layer. It is suitable for a local deployment or a production environment with a proper MongoDB connection and secure environment configuration.

## License

This project is currently unlicensed unless otherwise specified in the repository.
