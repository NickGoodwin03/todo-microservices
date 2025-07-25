from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)

AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:5001")
TASK_SERVICE_URL = os.getenv("TASK_SERVICE_URL", "http://localhost:5002")


# Proxy to auth service
@app.route('/auth/<path:path>', methods=["GET", "POST"])
def auth_proxy(path):
    data = request.get_json() if request.method in ['POST', 'PUT', 'PATCH'] else None

    resp = requests.request(
        method=request.method,
        url=f"{AUTH_SERVICE_URL}/{path}",
        headers={key: value for key, value in request.headers if key != 'Host'},
        json=data,
    )

    return jsonify(resp.json()), resp.status_code


# Proxy to task service
@app.route('/tasks', methods=["GET", "POST"])
@app.route('/tasks/<path:path>', methods=["GET", "PUT", "DELETE"])
def task_proxy(path=""):
    full_url = f"{TASK_SERVICE_URL}/tasks"
    if path:
        full_url += f"/{path}"

    data = request.get_json() if request.method in ['POST', 'PUT', 'PATCH'] else None

    headers = {
        "Authorization": request.headers.get("Authorization", ""),
        "Content-Type": "application/json"
    }

    resp = requests.request(
        method=request.method,
        url=full_url,
        headers=headers,
        json=data,
    )
    return jsonify(resp.json()), resp.status_code


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
