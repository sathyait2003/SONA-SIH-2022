import pyrebase
from firebase_admin import credentials

# cred = credentials.Certificate("path/to/serviceAccountKey.json")
# firebase_admin.initialize_app(cred)

# config = {
#     "apiKey": "AIzaSyC4YR6btOxmRFz4cqmUr7RTyehh68TdW8w",
#     "authDomain": "plagiarism-9c162.firebaseapp.com",
#     "databaseURL": "https://plagiarism-9c162-default-rtdb.firebaseio.com",
#     "projectId": "plagiarism-9c162",
#     "storageBucket": "plagiarism-9c162.appspot.com",
#     "messagingSenderId": "342103639050",
#     "appId": "1:342103639050:web:9f5edf06e7f08aaf320bf3",
#     "measurementId": "G-QFB9CJ6NPJ"
#     # "serviceAccount":"plagiarism-9c162-firebase-adminsdk-p4i2n-a735d4d450.json"
# }
# import pyrebase

config = {
    "apiKey": "AIzaSyC4YR6btOxmRFz4cqmUr7RTyehh68TdW8w",
    "authDomain": "plagiarism-9c162.firebaseapp.com",
    "databaseURL": "https://plagiarism-9c162-default-rtdb.firebaseio.com",
    "projectId": "plagiarism-9c162",
    "storageBucket": "plagiarism-9c162.appspot.com",
    "serviceAccount": "plagiarism-9c162-firebase-adminsdk-p4i2n-64b44b9fd8.json"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
auth = firebase.auth()

user = auth.sign_in_with_email_and_password("usernamehere@user.com", "passwordhere")

data = {"name": "Mortimer 'Morty' Smith"}
db.child("users").child("Morty").set(data,user['idToken'])