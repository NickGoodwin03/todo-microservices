from flask import Blueprint, request, jsonify, current_app
from models import db, Task
import requests
import datetime

task_bp = Blueprint('task_bp', __name__)


def get_user_id_from_token():
    auth_header = request.headers.get('Authorization', '')

    # Logging
    print("Auth header:", auth_header)
    print("Calling verify:", current_app.config["AUTH_SERVICE_URL"] + "/verify")

    if not auth_header.startswith("Bearer "):
        return None
    token = auth_header.replace("Bearer ", "")

    try:
        auth_url = current_app.config["AUTH_SERVICE_URL"]
        resp = requests.get(
            f"{auth_url}/verify",
            headers={"Authorization": f"Bearer {token}"}
        )
        print("Verify response:", resp.status_code, resp.text)
        if resp.status_code == 200:
            return int(resp.json().get("user_id"))
    except Exception as e:
        print("Auth verification failed:", e)
    return None


# Function to get tasks to display on site (READ)
@task_bp.route('/tasks', methods=['GET'])
def get_tasks():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date.isoformat() if task.due_date else None,
            "completed": task.completed
        }
        for task in tasks
    ]), 200


# Function to create tasks to be stored in database
@task_bp.route('/tasks', methods=['POST'])
def create_task():
    user_id = get_user_id_from_token()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    task = Task(
        title=data["title"],
        description=data.get("description"),
        due_date=datetime.date.fromisoformat(data.get("due_date")) if data.get("due_date") else None,
        completed=False,
        user_id=user_id
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({"message": "Task created", "id": task.id}), 201

