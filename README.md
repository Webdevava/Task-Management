**Full-Stack Task Management Website**

[Live](https://task-management-ava.vercel.app/)

**Project Overview**

This project is a full-stack task management application that empowers users to create and manage their tasks, promoting productivity. The project leverages a modern and robust tech stack:

* **Front-End:** Next.js ([https://nextjs.org/](https://nextjs.org/)) for interactive user experiences.
* **Back-End:** FastAPI ([https://github.com/tiangolo/full-stack-fastapi-template](https://github.com/tiangolo/full-stack-fastapi-template)) for a RESTful API with efficient development practices.
* **Database:** PostgreSQL with Neon.tech ([https://neon.tech/](https://neon.tech/)) for scalability and ease of management.
* **Data Modeling:** SQLAlchemy ORM ([https://docs.sqlalchemy.org/](https://docs.sqlalchemy.org/)) for streamlined data management.
* **Deployment:** Vercel ([https://vercel.com/](https://vercel.com/)) for seamless hosting.

**Directories**

* **backend**: Houses the FastAPI back-end code, including API endpoints for task management and data persistence.
* **frontend**: Contains the Next.js front-end code, responsible for the user interface, data fetching, and interaction with the back-end API.

**Getting Started**

1. **Prerequisites:**
   - Node.js and npm (or yarn) installed on your system.
   - A Neon.tech account with a Postgres database ready.

2. **Clone the Repository:**

   ```bash
   git clone https://github.com/Webdevava/Task-Management.git
   cd task-management
   ```

3. **Set Up Dependencies:**

   ```bash
   # Navigate to the backend directory
   cd backend

   # Install backend dependencies
   pip install -r requirements.txt

   # Navigate back to the root directory
   cd ..

   # Navigate to the frontend directory
   cd frontend

   # Install frontend dependencies
   npm install
   ```

4. **Configure Neon.tech Connection:**

   - Create a `.env` file in the root directory (outside of `backend` or `frontend`).
   - Add the following environment variables, replacing placeholders with your actual values retrieved from Neon.tech:

     ```
     NEON_DB_CONNECTION_STRING=your_neon_db_connection_string
     ```

   - You can find your Neon.tech database connection string by following these steps:
     1. Log in to your Neon.tech dashboard.
     2. Navigate to the database you want to use.
     3. Click on "Settings" or "Connection Details" (depending on the UI).
     4. Copy the provided connection string.

5. **Run the Application:**

   - **Backend:**

     ```bash
     cd backend
     uvicorn main:app --reload --host 0.0.0.0  # Replace with desired host and port if needed
     ```

   - **Front-End:**

     ```bash
     cd frontend
     npm run dev  # Starts the development server
     ```

   - Access the application in your web browser at http://localhost:3000 (default for Next.js).

**Features**

* **Task Creation:** Create tasks with title, description, and status.
* **Task Management:** Edit task details, change statuses, and delete completed tasks.
* **Kanban Board (Bonus):** A visual Kanban board (currently optimized for laptops, not touchscreens) for efficient task organization and progress tracking (accessible at [/kanban](https://task-management-ava.vercel.app/kanban)).
* **Multiple Loading States:** Enhance user experience with informative loading states.
* **CORS Implementation:** Secure the back-end API with CORS to prevent unauthorized access.

**Future Enhancements**

* **User Authentication:** Implement a robust user authentication system with features like login, registration, and user roles.
* **Touchscreen Optimization:** Adapt the Kanban board for optimal use on touchscreens.
* **Advanced Features:** Consider incorporating dependencies for enhanced functionality, such as task attachments, due dates, and notifications.

**Contribution**

Pull requests are welcome for bug fixes, improvements, and new features. Please ensure adherence to project coding style and formatting guidelines.

**License**

This project is licensed under the MIT License (see LICENSE.md for details).
