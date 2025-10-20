This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:
- [Node.js](https://nodejs.org/) (version 20.x or later is recommended)
- npm (Node Package Manager), which is included with your Node.js installation.

You can verify your installation by running the following commands in your terminal:
```bash
node -v
npm -v
```

## Installation
1. Clone the repository Open your terminal and clone the project repository using Git:
	```bash
	git clone [https://github.com/gnick18/AspFumi_SeqProject-2025.git](https://github.com/gnick18/AspFumi_SeqProject-2025.git)
	```
2. Navigate to the project directory
	```bash
	cd AspFumi_SeqProject-2025
	```
3. Install dependencies Run the following command to install all the necessary packages defined in package.json:
	```bash
	npm install
	```
### Environment Setup
This project requires environment variables to connect to the database.

1. Create a local environment file In the root of the project directory, create a new file named `.env.local`.
2. Add the database connection string Open the `.env.local` file and add your Neon PostgreSQL connection string. It should look like this:
```
POSTGRES_URL="postgres://user:password@host:port/dbname"
```
Replace the placeholder with your actual database URL. 

Running the Application
1. Start the development server To run the application in development mode, use the following command:
	```bash 
	npm run dev
	```
2. Open the application Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you edit the source files.

## Available Scripts
In the project directory you can run:
- `npm run dev`: Runs the app in development mode
-  `npm run build`: Builds the app for production.
-  `npm run start`: Starts a production server.
-  `npm run lint`: Runs the linter to check for code quality issues.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js)
