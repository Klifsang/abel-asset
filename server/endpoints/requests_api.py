from flask import jsonify, request, session
from server.models.requests import Request
from server.app import db

def create_request():
    data = request.get_json()
    print(data)
    user_id = data.get('id')
    name = data.get('name')
    username = data.get('username')
    additional_data = {k: v for k, v in data.items() if k not in ['id', 'name', 'username']}

    if not user_id or not name or not username:
        return jsonify({"error": "Missing required fields"}), 400

    new_request = Request(
        user_id=user_id,
        name=name,
        username=username,
        additional_data=additional_data
    )

    db.session.add(new_request)
    db.session.commit()

    return jsonify({"message": "Request created successfully"}), 201

def get_requests():
    user_id = session["user_id"]
    requests = Request.query.filter_by(user_id=user_id).all()
    return jsonify([request.to_dict() for request in requests])

def patch_requests(request):
    data = request.get_json()
    user_id = session["user_id"]
    request_id = data.get('id')
    name = data.get('name')
    username = data.get('username')
    additional_data = {k: v for k, v in data.items() if k not in ['id', 'name', 'username']}
    request = Request.query.filter_by(user_id=user_id, id=request_id).first()
    if request:
        for key, value in data.items():
            setattr(request, key, value)
        db.session.commit()
        return jsonify({"message": "Request updated successfully"}), 201