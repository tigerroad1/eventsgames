import io
import csv
from flask import Blueprint, request, jsonify
from .models import User, Account, db
from .app import jwt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Create a Blueprint for API routes
api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 400

    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        # In the original bug, this was `user.id` (an int), which caused issues.
        # Flask-JWT-Extended expects a string identity.
        access_token = create_access_token(identity=str(user.id))
        return jsonify(access_token=access_token)

    return jsonify({"msg": "Bad email or password"}), 401

@api_bp.route('/accounts', methods=['GET'])
@jwt_required()
def get_accounts():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    accounts = [{"id": acc.id, "service_name": acc.service_name, "email": acc.email} for acc in user.accounts]
    return jsonify(accounts=accounts)

@api_bp.route('/accounts/import', methods=['POST'])
@jwt_required()
def import_accounts():
    current_user_id = get_jwt_identity()

    if 'file' not in request.files:
        return jsonify({"msg": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"msg": "No selected file"}), 400

    if file and file.filename.endswith('.csv'):
        try:
            # Read the file in memory
            stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
            csv_reader = csv.reader(stream)
            next(csv_reader) # Skip header row

            for row in csv_reader:
                service_name, email, password_encrypted = row
                new_account = Account(
                    service_name=service_name,
                    email=email,
                    password_encrypted=password_encrypted,
                    user_id=current_user_id
                )
                db.session.add(new_account)

            db.session.commit()
            return jsonify({"msg": "Accounts imported successfully"}), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": "Failed to import CSV", "error": str(e)}), 500

    return jsonify({"msg": "Invalid file type"}), 400