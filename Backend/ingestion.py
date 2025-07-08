import pandas as pd
from app import create_app, db
from app.models import Threat

CSV_PATH = '../cyber_threat_data.csv' 
app = create_app()

def safe_str(val):
    return str(val).strip() if pd.notnull(val) else None

def safe_int(val):
    try:
        return int(val)
    except (ValueError, TypeError):
        return None

def ingest_data(csv_path):
    df = pd.read_csv(csv_path)

    with app.app_context():
        for _, row in df.iterrows():
            threat = Threat(
                category = safe_str(row.get('Threat Category')),
                iocs = safe_str(row.get('IOCs (Indicators of Compromise)')),
                threat_actor = safe_str(row.get('Threat Actor')),
                attack_vector = safe_str(row.get('Attack Vector')),
                geo_location = safe_str(row.get('Geographical Location')),
                sentiment = safe_str(row.get('Sentiment in Forums')),
                severity = safe_str(row.get('Severity Score')),
                predicted_category = safe_str(row.get('Predicted Threat Category')),
                defense = safe_str(row.get('Suggested Defense Mechanism')),
                risk_level = safe_str(row.get('Risk Level Prediction')),
                description = safe_str(row.get('Cleaned Threat Description')),
                keywords = safe_str(row.get('Keyword Extraction')),
                named_entities = safe_str(row.get('Named Entities (NER)')),
                topic_labels = safe_str(row.get('Topic Modeling Labels')),
                word_count = safe_int(row.get('Word Count')),
            )
            db.session.add(threat)

        db.session.commit()
        print(f"Added {len(df)} records into the database.")


if __name__ == "__main__":
    print("Starting adding the records...")
    ingest_data(CSV_PATH)
