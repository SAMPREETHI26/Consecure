from app import create_app, db

print("Running setup_db.py")

app = create_app()

with app.app_context():
    print("Dropping existing tables…")
    db.drop_all()

    print("Creating tables…")
    db.create_all()

    print("Tables created successfully...")
