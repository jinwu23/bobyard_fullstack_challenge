# Uses python 3.11 as our base image
FROM python:3.11

# Goes to the app directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install app dependencies
RUN pip install -r requirements.txt

# Copy the rest of the app into the container
COPY . .

# Expose the backend port
EXPOSE 8000

# Run the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

