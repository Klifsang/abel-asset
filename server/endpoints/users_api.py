from flask import request
from server.models.users import User
from server.models.databaseconfig import db

def create_user():
    data = request.get_json()
    username = data['username']
    role = data['role']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']
    image = data['image']  
    user = User(username, role, email, password, confirm_password, image)
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
    
def delete_user():
    data = request.get_json()
    user_id = data['user_id']
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return {"message": "User deleted successfully"}, 201

def update_user():
    data = request.get_json()
    id = data.get('id')
    user = User.query.filter_by(id=id).first()
    if user:
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
    return {"message": "User updated successfully"}, 201

def get_users():
    users = User.query.all()
    return [user.to_dict() for user in users]

def get_user_by_id():
    data = request.get_json()
    user_id = data['user_id']
    user = User.query.filter_by(id=user_id).first()
    user_dict = user.to_dict()
    return user_dict