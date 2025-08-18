
# Multi-stage build for frontend and backend
FROM node:20 AS frontend-builder

# Set working directory
WORKDIR /frontend

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ ./

# Build frontend for production
RUN npm run build

# ---------- Stage 2: Backend with Frontend built ----------
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend from Stage 1 into the correct location
COPY --from=frontend-builder /frontend/dist ./frontend/dist

# Expose port
EXPOSE 8080

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
