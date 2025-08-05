
# # Step 1: Use Python image for backend
# FROM python:3.11-slim

# # Set working directory
# WORKDIR /app

# # Copy backend files
# COPY backend/ ./backend/

# # Install backend dependencies
# COPY backend/requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy frontend build files into backend static folder
# COPY frontend/dist/ ./backend/app/frontend/dist/

# # Expose port (FastAPI default port)
# EXPOSE 8000

# # Run the FastAPI app with uvicorn
# CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy backend code
COPY ./backend /app

# Copy built frontend into container
COPY ./frontend/dist /app/frontend/dist

# Expose port
EXPOSE 8000

# Run FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
