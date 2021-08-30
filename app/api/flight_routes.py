from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Aircraft, db, Flight
import simplejson as json

flight_routes = Blueprint('flight', __name__)

@flight_routes.route('/user/<int:id>')
def get_route(id):
    flights = Flight.query.filter(Flight.user_id == id).all()
    return json.dumps({'flights': [flight.to_dict() for flight in flights]})

@flight_routes.route('/new', methods=['POST'])
def new_flight():
    data = request.get_json()
