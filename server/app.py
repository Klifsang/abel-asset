# app.py
from flask import Flask, jsonify, redirect, send_from_directory, session, url_for
from functools import wraps
from flask_cors import CORS
from flask_migrate import Migrate
from flask_session import Session
from server.config import ApplicationConfig
from server.models.databaseconfig import db
from flask_bcrypt import Bcrypt
import os

from endpoints.auth_api import login, get_current_user, logout
from endpoints.users_api import create_user, delete_user,update_user, get_users, get_user_by_id
from endpoints.assets_api import add_assets, delete_assets, patch_assets, get_assets
from endpoints.approved_api import add_approved, get_approved, delete_approved
from endpoints.requests_api import create_request, patch_requests

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)
app.config.from_object(ApplicationConfig)

CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

db.init_app(app)
app.secret_key = os.urandom(24)
# Initialize the Flask Session
Session(app)
migrate = Migrate(app, db)
# db.create_all()

from models import users, assets, approved, requests

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("user_id")
        if user_id is None:
            return jsonify({'message': 'This is a protected page'}), 401
        return f(*args, **kwargs)
    return decorated_function

def is_admin(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_level = session.get("user_level")
        if user_level != 'admin':
            return jsonify({'message': 'This is allowed for admins only'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/', methods=['GET', 'POST'])
def index():
    return send_from_directory(app.static_folder, 'index.html')
# Catch-all route for handling unavailable routes
@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('index'))
#  auth
app.add_url_rule('/api/login', 'login', login, methods=['POST'])
app.add_url_rule('/api/register', 'register', create_user, methods=['POST'])
app.add_url_rule('/api/logout', 'logout', logout, methods=['POST'])

# assets
app.add_url_rule('/api/assets', 'add_assets', add_assets, methods=['POST'])
app.add_url_rule('/api/assets', 'get_assets', get_assets, methods=['GET'])
app.add_url_rule('/api/assets/<int:id>', 'patch_assets', patch_assets, methods=['PATCH'])
app.add_url_rule('/api/assets/<int:id>', 'delete_assets', delete_assets, methods=['DELETE'])

# user
app.add_url_rule('/api/users', 'get_users', get_users, methods=['GET'])
app.add_url_rule('/api/users/<int:id>', 'get_user_by_id', get_user_by_id, methods=['GET'])
app.add_url_rule('/api/users/<int:id>', 'update_user', update_user, methods=['PATCH'])
app.add_url_rule('/api/users/<int:id>', 'delete_user', delete_user, methods=['DELETE'])

# approved

app.add_url_rule('/api/approved', 'add_approved', add_approved, methods=['POST'])
app.add_url_rule('/api/approved', 'get_approved', get_approved, methods=['GET'])
app.add_url_rule('/api/approved/<int:id>', 'delete_approved', delete_approved, methods=['DELETE'])

# requests - AssetsUser.jsx
# @app.route('/api/requests', methods=['POST'])
app.add_url_rule('/api/requests', 'create_request', create_request, methods=['POST'])

if __name__ == '__main__':
    app.run(port=5000, debug=True)