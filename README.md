# Scheduled Order Management System

A full-stack application that allows users to schedule recurring or
one-time orders, process them automatically using background workers,
and monitor execution logs.

------------------------------------------------------------------------

## Tech Stack

### Backend

-   Django
-   Django REST Framework
-   PostgreSQL
-   Celery
-   Redis
-   JWT Authentication

### Frontend

-   React.js (Basic UI)

------------------------------------------------------------------------

# Project Structure

scheduled_orders/ 
    └── backend/
        ├── accounts/ \# Authentication app 
        ├── orders/ \# Scheduled order logic 
        ├── scheduled_orders/ \# Project settings 
            ├── settings.py 
            ├── celery.py 
            ├── logs/ \# Application logs 
            ├──manage.py 
        ├── requirements.txt 
    └── frontend/

------------------------------------------------------------------------

# Backend Setup Guide

## 1️ Clone the Repository

git clone `<repo-url>`{=html} cd scheduled_orders

------------------------------------------------------------------------

## 2️ Create Virtual Environment

python -m venv venv

Activate:

Windows: venv`\Scripts`{=tex}`\activate`{=tex}

Mac/Linux: source venv/bin/activate

------------------------------------------------------------------------

## 3️ Install Dependencies

pip install -r requirements.txt

------------------------------------------------------------------------

## 4️ Setup PostgreSQL

CREATE DATABASE scheduled_orders_db;

Update settings.py with your DB credentials.

------------------------------------------------------------------------

## 5️ Run Migrations

python manage.py makemigrations python manage.py migrate

------------------------------------------------------------------------

## 6️ Create Superuser (Optional)

python manage.py createsuperuser

Admin: http://127.0.0.1:8000/admin/

------------------------------------------------------------------------

## 7️ Start Redis

redis-server

OR (Docker):

docker run -d -p 6379:6379 redis

------------------------------------------------------------------------

## 8️ Run Django Server

python manage.py runserver

API Base URL: http://127.0.0.1:8000/api/

------------------------------------------------------------------------

## 9️ Start Celery Worker

python -m celery -A scheduled_orders worker --loglevel=info

------------------------------------------------------------------------

## 10 Start Celery Beat

python -m celery -A scheduled_orders beat --loglevel=info

------------------------------------------------------------------------

# API Endpoints

## Authentication

POST /api/auth/register/ POST /api/auth/login/

Use: Authorization: Bearer `<access_token>`

------------------------------------------------------------------------

## Scheduled Orders

POST /api/scheduled-orders/ GET /api/scheduled-orders/ PUT
/api/scheduled-orders/{id}/ DELETE /api/scheduled-orders/{id}/

------------------------------------------------------------------------

## Execution Logs

GET /api/executions/

------------------------------------------------------------------------

# Logging

Logs directory:

logs/app.log logs/celery.log logs/celery_beat.log

------------------------------------------------------------------------

# How to Test

1.  Register
2.  Login
3.  Create scheduled order
4.  Ensure Celery worker + beat running
5.  Check execution logs

------------------------------------------------------------------------

# Future Improvements

-   Swagger documentation
-   Unit testing
-   Docker production setup
-   Deployment guide

------------------------------------------------------------------------

# Author

Backend assessment project demonstrating: - REST API design - Background
job scheduling - Logging & monitoring
