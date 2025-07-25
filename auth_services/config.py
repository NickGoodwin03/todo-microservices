import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///tasks.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://auth_service:5001")
