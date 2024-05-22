from flask import request
from server.models.assets import Asset
from server.models.databaseconfig import db
def add_assets():
    data = request.get_json()
    name = data['name']
    image = data['image']
    condition = data['condition']
    number = data['number']
    dispursed = data['dispursed']
    asset = Asset(name, image, condition,number,dispursed)
    db.session.add(asset)
    db.session.commit()
    return asset.to_dict(), 201 

def delete_assets():
    data = request.get_json()
    id = data.get('id')
    asset = Asset.query.filter_by(id=id).first()
    if asset:
        db.session.delete(asset)
        db.session.commit()
    return {"message": "Asset deleted successfully"}, 201   

def patch_assets():
    data = request.get_json()
    id = data.get('id')
    asset = Asset.query.filter_by(id=id).first()
    if asset:
        for key, value in data.items():
            setattr(asset, key, value)
        db.session.commit()
    return {"message": "Asset updated successfully"}, 201

def get_assets():
    assets = Asset.query.all()
    if assets:
        return [asset.to_dict() for asset in assets]