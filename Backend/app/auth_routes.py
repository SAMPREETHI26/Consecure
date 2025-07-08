from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin

# Single Blueprint definition
auth = Blueprint('auth', __name__)

# In-memory store (replace with DB in real app)
users = {}

@auth.route('/api/register', methods=['POST'])
@cross_origin()  # Enables CORS for this route
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Username and password required"}), 400

    if username in users:
        return jsonify({"msg": "User already exists"}), 409

    users[username] = generate_password_hash(password)
    return jsonify({"msg": "User registered successfully"}), 201

@auth.route('/api/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username not in users or not check_password_hash(users[username], password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@auth.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"msg": "You are authenticated!"})
