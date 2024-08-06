from typing import Dict, Any

from firebase.configure_firebase import db

def save_to_firebase(collection: str, document: str, data: Dict[str, Any]) -> None:
    doc_ref = db.collection(collection).document(document)
    doc_ref.set(data)