from app import create_app, db
from app.models import Threat

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

# Load data from DB
def fetch_data():
    threats = Threat.query.with_entities(Threat.description, Threat.category).all()
    return pd.DataFrame(threats, columns=["description", "category"])

def train_and_save_model():
    df = fetch_data()
    df.dropna(inplace=True)

    X = df["description"]
    y = df["category"]

    vectorizer = TfidfVectorizer()
    x_vec = vectorizer.fit_transform(X)

    model = LogisticRegression(random_state=42)

    model.fit(x_vec, y)

    # Save model & vectorizer
    with open("model.pkl", "wb") as f:
        pickle.dump(model, f)

    with open("vectorizer.pkl", "wb") as f:
        pickle.dump(vectorizer, f)

    print("Model and vectorizer saved!")

if __name__ == "__main__":
    from app import create_app
    app = create_app()
    with app.app_context():
        train_and_save_model()
