import secrets
from pathlib import Path

def get_or_create_jwt_secret(file_path=".jwt_secret"):
    if not Path(file_path).exists():
        with open(file_path, "w") as f:
            secret = secrets.token_urlsafe(32)
            f.write(secret)
    else:
        with open(file_path, "r") as f:
            secret = f.read().strip()
    return secret
