from flask_socketio import SocketIO

socketio = SocketIO(cors_allowed_origins="*")

def broadcast_threat(threat_data):
    socketio.emit('new_threat', threat_data)
