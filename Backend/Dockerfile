# Use the official Python image as base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy and install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install python-logstash-async

# Copy the rest of the application code
COPY . .

# Expose port 5000 for Flask server
EXPOSE 5000

# Start Flask application
# CMD ["python", "app.py"]

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=3000
ENV FLASK_ENV=development

CMD flask run -h 0.0.0.0 -p 5000