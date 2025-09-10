<h1>Bobyard Comments</h1>
Bobyard Comments is a full-stack web application that allows users to view, add, update, and delete comments.  

It features a React frontend for dynamic user interface and a Django backend with a PostgreSQL database for data storage and API functionality.  
The appliation is containerized using Docker for easy setup and deployment.  

<h2>Features</h2>  

- **View Comments**: Display a list of comments, sorted newest-first, with optional image URLs.
- **Add Comments**: Submit new comments with text and an optional image URL.
- **Edit/Delete Comments**: Update or remove existing comments.
- **Seed Data**: Import sample comments from a JSON file.
- **Dockerized Setup:**: Run the app with a single docker-compose command.

<h2>Prerequisites</h2>
To run this application, ensure you have the following installed:  

- Docker (version 20.10 or higher)
- Docker Compose (version 1.29 or higher)
- Git

<h2>Project Structure</h2>  

- `backend/`: Django backend with the `bobyard_api` project and `comments` app.
  - `comments/models.py`: Defines the `Comment` model
  -  `comments/serializers.py`: Handles JSON serialization for API endpoints.
  -  `commments/management/commands/import_comments.py`: Imports comments from `comments.json`.
-  `frontend/`: React frontend with components for displaying and managing comments.
-  `comments.json`: Sample JSON file for seeding comments.
-  `docker-compose.yml`: Configures the PostgreSQL database, Django backend, and React frontend services.

<h2>Setup Instructions</h2>
Follow these steps to run the application locally:  

1. **Clone the Repository**
   
     `git clone https://github.com/jinwu23/bobyard_fullstack_challenge.git`
3. **Build and Run the Application**
   
     `docker-compose up --build`
5. **Access the Application**
   
     Open your browser and navigate to `http://localhost:3000` to view the React frontend.
     The frontend communicates with the Django backend at `http://localhost:8000/api`.
7. **Seed the Database with Comments (Optional)**
   
     To import the comments from `comments.json`:
     `docker-compose exec backend python manage.py import_comments /app/comments.json --clear`
     The `--clear` flag deletes existing comments before importing. Omit it to append new comments.

<h2>Stopping the Application</h2>  

- To stop the containers:
  - `docker-compose down`
- To stop and remove containers, networks, and volumes:
  - `docker-compose down -v`

<h2>Development Notes</h2>  

- **Environment Variables**:
  - The backend uses environment variables in `docker-compose.yml` for database settings(`DB_NAME`, `DB_USER`, etc.) and `DJANGO_SECRET_KEY`.
  - The frontend uses `REACT_APP_API_URL` to connect to the backend API.
- **Database Persistence**:
  - The `postgres_data` volume ensures database data persists across container restarts.
- **CORS**: The backend allows requests from `http://localhost:3000` (configured in `settings.py`).
 
