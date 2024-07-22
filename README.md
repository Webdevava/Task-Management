# Full-Stack Task Management Website

[**Live Demo**](https://task-management-ava.vercel.app/)

## Project Overview

This full-stack task management application is designed to help users create and manage tasks efficiently, enhancing productivity through a modern and robust tech stack:

- **Front-End:** [Next.js](https://nextjs.org/) for an interactive and dynamic user experience.
- **Back-End:** [FastAPI](https://github.com/tiangolo/full-stack-fastapi-template) for a fast and efficient RESTful API.
- **Database:** [PostgreSQL](https://neon.tech/) with Neon.tech for scalable and manageable data storage.
- **Data Modeling:** [SQLAlchemy ORM](https://docs.sqlalchemy.org/) for simplified data management.
- **Deployment:** [Vercel](https://vercel.com/) for seamless hosting and deployment.

## Project Structure

- **`backend`**: Contains FastAPI code for managing tasks and handling data persistence.
- **`frontend`**: Holds Next.js code for the user interface, data fetching, and API interaction.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed.
- A Neon.tech account with a PostgreSQL database set up.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Webdevava/Task-Management.git
   cd Task-Management
   ```

2. **Set Up Dependencies:**

   - **Backend:**

     ```bash
     cd backend
     pip install -r requirements.txt
     ```

   - **Frontend:**

     ```bash
     cd ../frontend
     npm install
     ```

3. **Configure Neon.tech Connection:**

   - Create a `.env` file in the root directory (not in `backend` or `frontend`).
   - Add the following environment variable:

     ```env
     NEON_DB_CONNECTION_STRING=your_neon_db_connection_string
     ```

   - Obtain the connection string from Neon.tech:
     1. Log in to the Neon.tech dashboard.
     2. Navigate to your database.
     3. Go to "Settings" or "Connection Details."
     4. Copy the connection string provided.

4. **Run the Application:**

   - **Backend:**

     ```bash
     cd backend
     uvicorn main:app --reload --host 0.0.0.0  # Adjust host and port as needed
     ```

   - **Frontend:**

     ```bash
     cd ../frontend
     npm run dev  # Starts the development server
     ```

   - Access the application in your browser at [http://localhost:3000](http://localhost:3000).

## Features

- **Task Creation:** Add tasks with titles, descriptions, and statuses.
- **Task Management:** Edit tasks, update statuses, and delete completed tasks.
- **Kanban Board (Bonus):** Visual Kanban board for task organization and progress tracking (available at [/kanban](https://task-management-ava.vercel.app/kanban)).
- **Loading States:** Informative loading indicators to enhance user experience.
- **CORS Implementation:** Secure the API to prevent unauthorized access.

## Future Enhancements

- **User Authentication:** Implement features such as login, registration, and user roles.
- **Touchscreen Optimization:** Improve the Kanban board for touchscreen usability.
- **Advanced Features:** Explore additional functionalities like task attachments, due dates, and notifications.

## Contribution

Contributions are welcome for bug fixes, improvements, and new features. Please follow the project's coding style and formatting guidelines.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
