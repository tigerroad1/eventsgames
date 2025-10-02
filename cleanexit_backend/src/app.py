from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions with the app
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}}) # Allow CORS for all API routes

    # Import models to ensure they are registered with SQLAlchemy
    from . import models

    # A simple test route
    @app.route('/api/hello')
    def hello():
        return "Hello, CleanExit Backend is configured!"

    @app.cli.command("init-db")
    def init_db_command():
        """Clear the existing data and create new tables."""
        with app.app_context():
            db.create_all()
        print("Initialized the database.")

    # Import and register blueprints
    from .routes import api_bp
    app.register_blueprint(api_bp)

    return app