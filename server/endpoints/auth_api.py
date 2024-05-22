from flask import jsonify, request, session
from server.models.users import User
def login():
    from server.app import bcrypt
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(email, password)
    
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Username or password incorrect"}), 401
    
    session["user_id"] = user.id
    session["user_role"] = user.role
    
    return jsonify({
        "id": user.id,
        "username": user.username,
        "assetId" : user.asset_id,
        "role" : user.role,
        "email": user.email,
        "image": user.image
    }), 200
    


def get_current_user():
    user_id = session.get("user_id")
    print(user_id)
    if user_id is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    # user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user_id,
    }) 
    
def logout():
    session.pop("user_id", None)
    session.pop("user_level", None)
    return jsonify({"message": "Logged out successfully"}), 200