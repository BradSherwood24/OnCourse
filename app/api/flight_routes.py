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
    print('DATA!!!!', data)
    flight = Flight(
        user_id=data['user_id'],
        aircraft_id=data['aircraft_id'],
        name=data['name'],
        departure=data['departure'],
        arrival=data['arrival'],
        airports=data['airports'],
        distance=data['distance'],
        save=False
    )
    db.session.add(flight)
    db.session.commit()
    return {'flight':json.dumps(flight.to_dict())}

@flight_routes.route('/update/<int:id>', methods=['PATCH'])
def update(id):
    data = request.get_json()
    flight = Flight.query.filter(Flight.id == id).first()
    flight.user_id=data['user_id'],
    flight.aircraft_id=data['aircraft_id'],
    flight.name=data['name'],
    flight.departure=data['departure'],
    flight.arrival=data['arrival'],
    flight.airports=data['airports'],
    flight.distance=data['distance'],
    flight.save=data['save']
    db.session.commit()
    return {'flight':json.dumps(flight.to_dict())}


@flight_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_flight(id):
    flight = Flight.query.filter(Flight.id == id).first()
    db.session.delete(flight)
    db.session.commit()
    return {'delete':True}
