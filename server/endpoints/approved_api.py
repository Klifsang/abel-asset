from flask import jsonify, request, session
from server.models.approved import Approved
from server.models.databaseconfig import db


def add_approved():
    user_id = session["user_id"]
    message_id = request.json['message_id']
    message = request.json['message']
    approved = Approved(user_id=user_id, message_id=message_id, message=message)
    db.session.add(approved)
    db.session.commit()
    return approved.to_dict()
def get_approved():
    user_id = session["user_id"]
    approved = Approved.query.filter_by(user_id=user_id).all()
    return jsonify([approv.to_dict() for approv in approved])

def delete_approved():
    user_id=session["user_id"]
    approved = Approved.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({'message_id': 'Deleted successfully'})

