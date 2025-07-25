import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes import task_bp
from models import db
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///tasks.db")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['AUTH_SERVICE_URL'] = os.getenv("AUTH_SERVICE_URL", "http://auth_service:5000")

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(task_bp)
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5002)
