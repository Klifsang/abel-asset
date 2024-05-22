from server.app import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey('assets.id'))
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    image = db.Column(db.String)

    asset = db.relationship("Asset", back_populates="users")
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role,
            'asset_id': self.asset_id,
            'email': self.email,
            'image': self.image
        }