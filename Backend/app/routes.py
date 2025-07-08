from flask import Blueprint, request, jsonify
from .models import Threat
from . import db

routes = Blueprint('routes', __name__)

# 1. GET /api/threats?page=&limit=&category=&search=
@routes.route('/api/threats', methods=['GET'])
def get_threats():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    category = request.args.get('category')
    search = request.args.get('search')

    query = Threat.query

    if category:
        query = query.filter(Threat.category.ilike(f'%{category}%'))

    if search:
        query = query.filter(Threat.description.ilike(f'%{search}%'))

    threats = query.paginate(page=page, per_page=limit, error_out=False)

    results = [{
        'id': t.id,
        'category': t.category,
        'description': t.description,
        'severity': t.severity,
        'geo_location': t.geo_location
    } for t in threats.items]

    return jsonify({
        'page': page,
        'limit': limit,
        'total': threats.total,
        'threats': results
    })


# 2. GET /api/threats/<id>
@routes.route('/api/threats/<int:threat_id>', methods=['GET'])
def get_threat_by_id(threat_id):
    threat = Threat.query.get(threat_id)
    if not threat:
        return jsonify({'error': 'Threat not found'}), 404

    result = {
        'id': threat.id,
        'category': threat.category,
        'iocs': threat.iocs,
        'threat_actor': threat.threat_actor,
        'attack_vector': threat.attack_vector,
        'geo_location': threat.geo_location,
        'sentiment': threat.sentiment,
        'severity': threat.severity,
        'predicted_category': threat.predicted_category,
        'defense': threat.defense,
        'risk_level': threat.risk_level,
        'description': threat.description,
        'keywords': threat.keywords,
        'named_entities': threat.named_entities,
        'topic_labels': threat.topic_labels,
        'word_count': threat.word_count
    }

    return jsonify(result)


# 3. GET /api/threats/stats
@routes.route('/api/threats/stats', methods=['GET'])
def get_threat_stats():
    from sqlalchemy import func

    total_threats = db.session.query(func.count(Threat.id)).scalar()
    category_counts = db.session.query(Threat.category, func.count()).group_by(Threat.category).all()
    severity_counts = db.session.query(Threat.severity, func.count()).group_by(Threat.severity).all()

    return jsonify({
        'total_threats': total_threats,
        'category_counts': dict(category_counts),
        'severity_counts': dict(severity_counts)
    })

import pickle
from flask import request, jsonify
from socket_server import broadcast_threat  
@routes.route('/api/analyze', methods=['POST'])
def analyze_threat():
    data = request.get_json()
    description = data.get('description', '')

    if not description:
        return jsonify({"error": "Description is required"}), 400

    # Load model and vectorizer
    try:
        with open("model.pkl", "rb") as f:
            model = pickle.load(f)
        with open("vectorizer.pkl", "rb") as f:
            vectorizer = pickle.load(f)
    except Exception as e:
        return jsonify({"error": "Model loading failed", "details": str(e)}), 500

    x_vec = vectorizer.transform([description])
    prediction = model.predict(x_vec)[0]

    broadcast_threat({
    'description': description,
    'category': prediction,
})


    return jsonify({"predicted_category": prediction})
