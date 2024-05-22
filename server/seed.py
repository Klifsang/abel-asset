from server.app import bcrypt, app

with app.app_context():
    from server.models.approved import Approved
    from server.models.users import User 
    from server.models.assets import Asset
    from server.models.databaseconfig import db
    
    
    assets= [
            {
            "name": "macbook",
            "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
            "condition": "Good",
            "number": "12",
            "dispursed": "all"
            },
            {
            "name": "samsung printer",
            "image": "https://plus.unsplash.com/premium_photo-1682145762522-cf0ea19fcd89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2Ftc3VuZyUyMHByaW50ZXJ8ZW58MHx8MHx8fDA%3D",
            "condition": "medium",
            "number": "2",
            "dispursed": "1"
            },
            {
            "name": "office desks(mahogany)",
            "image": "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fG9mZmljZSUyMGRlc2t8ZW58MHx8MHx8fDA%3D",
            "condition": "Good",
            "number": "10",
            "dispursed": "all"
            },
            {
            "name": "calculator",
            "image": "https://images.unsplash.com/photo-1598690042638-1b9844b7ef83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNhbGN1bGF0b3J8ZW58MHx8MHx8fDA%3D",
            "condition": "Good",
            "number": "12",
            "dispursed": "all"
            },
            {
            "name": "security clothes",
            "image": "https://plus.unsplash.com/premium_photo-1682125948844-e2dc8996b0f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VjdXJpdHklMjBjbG90aGVzfGVufDB8fDB8fHww",
            "condition": "medium",
            "number": "2",
            "dispursed": "all"
            },
            {
            "name": "macbook m3",
            "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
            "condition": "Good",
            "number": "12",
            "dispursed": "all"
            },
            {
            "name": "toyota",
            "image": "https://images.unsplash.com/photo-1569769928296-0b32cc843f58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHRveW90YXxlbnwwfHwwfHx8MA%3D%3D",
            "condition": "medium",
            "number": "3",
            "dispursed": "all"
            },
            {
            "name": "badge",
            "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
            "condition": "Good",
            "number": "50",
            "dispursed": "7"
            },
            {
            "name": "macbook",
            "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
            "condition": "Good",
            "number": "12",
            "dispursed": "all"
            }
        ]
        
    for asset in assets:
        new_asset = Asset(
            name=asset["name"],
            image=asset["image"],
            condition=asset["condition"],
            number=asset["number"],
            dispursed=asset["dispursed"]
        )
        db.session.add(new_asset)
        db.session.commit()
        
    
    
    users = [
        {
        "username": "Dan",
        "role": "manager",
        "assetId": 1,
        "email": "danspmunene@gmail.com",
        "password": "12345678!q",
        "confirmPassword": "12345678!q",
        "image": "https://images.playground.com/2985ba92c9dd4aed845f03fd21efe46a.jpeg"
        },
        {
        "username": "wolf",
        "role": "finance",
        "assetId": 4,
        "email": "wolf@gmail.com",
        "password": "12345678!q",
        "confirmPassword": "12345678!q",
        "image": "https://images.playground.com/5121d5ddd0da4365b02a8ee5f4ea75f0.jpeg"
        },
        {
        "role": "Projectmanager",
        "assetId": 1,
        "username": "koech",
        "email": "eugene@gmail.com",
        "password": "12345678@a",
        "image":"https://images.playground.com/b77aa77a07be4737abf75a30ed57e006.jpeg",
        "confirmPassword": "12345678@a"
        },
        {
        "role": "Developer",
        "username": "abelkipkorir185@gmail.com",
        "assetId": 1,
        "email": "abelkipkorir185@gmail.com",
        "password": "12345678A@",
        "image": "https://images.playground.com/e7a0b7e796764631b63c9d6bb41761a0.jpeg",
        "confirmPassword": "12345678A@"
        },
        {
        "username": "Eliud",
        "assetId": 3,
        "role": "chef",
        "email": "eliud@gmail.com",
        "password": "12345678",
        "confirmPassword": "12345678",
        "image": "https://images.playground.com/09ce4708051f4849996fe1bc4bcb2c86.jpeg"
        },
        {
        "username": "Andrew",
        "role": "security",
        "assetId": 5,
        "email": "achumba52@gmail.com",
        "password": "Makiche1",
        "confirmPassword": "Makiche1",
        "image": "https://images.playground.com/868832cdcf7f4bddb9212be429a00ff0.jpeg"
        },
        {
        "role": "security",
        "assetId": 5,
        "username": "sang",
        "email": "sang@gmail.com",
        "image":"https://images.playground.com/2748383f787f4227bcdfa67de35c36a5.jpeg",
        "password": "12345678",
        "confirmPassword": "12345678"
        }
    ]
    
    for user in users:
        new_user = User(
            username=user["username"],
            email=user["email"],
            password=bcrypt.generate_password_hash(user["password"]).decode("utf-8"),
            role=user["role"],
            asset_id=user["assetId"],
            image=user["image"]
        )
        db.session.add(new_user)
        db.session.commit()
        
        

            
    
    approved= [
    {
      "userId": "2",
      "messageId": "2",
      "message": "your request has been placed on PENDING,please wait as for any incoming messages via email"
    }
  ]
    
    for approv in approved:
        new_approved = Approved(
            id="2",
            user_id=approv["userId"],
            message_id=approv["messageId"],
            message=approv["message"]
        )
        db.session.add(new_approved)
        db.session.commit()