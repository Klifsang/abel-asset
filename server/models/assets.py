from server.app import db

class Asset(db.Model):
    
    __tablename__ = 'assets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    condition = db.Column(db.String)
    number = db.Column(db.String)
    dispursed = db.Column(db.String)

    users = db.relationship("User", back_populates="asset")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "condition": self.condition,
            "number": self.number,
            "dispursed": self.dispursed,
            "users": [user.to_dict() for user in self.users]
        }