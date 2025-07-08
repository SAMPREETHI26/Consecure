from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from .extensions import db  
from .auth_routes import auth
from .routes import routes
from .utils import get_or_create_jwt_secret
from socket_server import socketio 

def create_app():
    app = Flask(__name__)
    load_dotenv()

    # DB config
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = os.getenv('DB_PORT')
    DB_NAME = os.getenv('DB_NAME')

    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # JWT
    app.config['JWT_SECRET_KEY'] = get_or_create_jwt_secret()
    JWTManager(app)

    # Initialize extensions
    db.init_app(app)
    socketio.init_app(app)

    # Register Blueprints
    app.register_blueprint(routes)
    app.register_blueprint(auth)

    # CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    with app.app_context():
        db.create_all

    return app
