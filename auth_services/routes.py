from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from models import db, User
import datetime

# SECRET_KEY = "your-secret-key"  # Ideally, import this from a config file or environment

auth_bp = Blueprint('auth_bp', __name__)


@auth_bp.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Create JWT Token (one hour expiration)
    access_token = create_access_token(
        identity=str(new_user.id),
        expires_delta=datetime.timedelta(hours=1)
    )

    return jsonify({"access_token": access_token}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Create JWT Token (one hour expiration)
    access_token = create_access_token(
        identity=str(user.id),
        expires_delta=datetime.timedelta(hours=1)
    )

    return jsonify({"access_token": access_token}), 200


@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    current_user_id = get_jwt_identity()
    return jsonify({"user_id": current_user_id}), 200
