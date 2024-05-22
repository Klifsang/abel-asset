from server.app import db


class Approved(db.Model):
    __tablename__ = 'approved'
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_id = db.Column(db.String)
    message = db.Column(db.String, nullable=False)

    user = db.relationship("User", backref="approvals")
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message_id': self.message_id,
            'message': self.message
        }