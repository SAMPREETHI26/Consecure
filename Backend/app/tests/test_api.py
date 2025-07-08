import pytest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from app import create_app
from app.extensions import db  # if you have db in extensions.py


@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.app_context():
        yield app.test_client()
        

def test_register_success(client):
    res = client.post('/api/register', json={
        'username': 'testuser',
        'password': 'testpass'
    })
    assert res.status_code == 201
    assert res.get_json()['msg'] == 'User registered successfully'

def test_register_duplicate_user(client):
    client.post('/api/register', json={'username': 'testuser', 'password': 'pass'})
    res = client.post('/api/register', json={'username': 'testuser', 'password': 'pass'})
    assert res.status_code == 409
    assert res.get_json()['msg'] == 'User already exists'

def test_login_success(client):
    client.post('/api/register', json={'username': 'tester', 'password': 'pass'})
    res = client.post('/api/login', json={'username': 'tester', 'password': 'pass'})
    assert res.status_code == 200
    assert 'access_token' in res.get_json()

def test_login_invalid(client):
    res = client.post('/api/login', json={'username': 'wrong', 'password': 'wrong'})
    assert res.status_code == 401
    assert res.get_json()['msg'] == 'Invalid credentials'

def test_protected_without_token(client):
    res = client.get('/api/protected')
    assert res.status_code == 401

def test_protected_with_token(client):
    client.post('/api/register', json={'username': 'authuser', 'password': 'pass'})
    login_res = client.post('/api/login', json={'username': 'authuser', 'password': 'pass'})
    token = login_res.get_json()['access_token']
    res = client.get('/api/protected', headers={
        'Authorization': f'Bearer {token}'
    })
    assert res.status_code == 200
    assert res.get_json()['msg'] == 'You are authenticated!'
