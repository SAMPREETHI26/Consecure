from .extensions import db 
class Threat(db.Model):
    __tablename__ = 'threats'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100))
    iocs = db.Column(db.Text)
    threat_actor = db.Column(db.String(255))
    attack_vector = db.Column(db.String(255))
    geo_location = db.Column(db.String(255))
    sentiment = db.Column(db.String(100))
    severity = db.Column(db.String(100))
    predicted_category = db.Column(db.String(100))
    defense = db.Column(db.Text)
    risk_level = db.Column(db.String(100))
    description = db.Column(db.Text)  # Cleaned Threat Description
    keywords = db.Column(db.Text)
    named_entities = db.Column(db.Text)
    topic_labels = db.Column(db.Text)
    word_count = db.Column(db.Integer)
    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
