from datetime import datetime
from server.app import db

class Request(db.Model):
    
    __tablename__ = 'requests'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    additional_data = db.Column(db.JSON, nullable=False)  # Store the rest of the form data as JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'username': self.username,
            'additional_data': self.additional_data,
            'created_at': self.created_at,
        }
    
    