import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('firebase/secret.json')
"""
For users that are not me lol.
Generate a new private key and save the JSON file. Then use the file to initialize the SDK
[path](https://console.firebase.google.com/u/0/project/tap2tell-dfb1a/settings/serviceaccounts/adminsdk)
"""

app = firebase_admin.initialize_app(cred)

db = firestore.client()
