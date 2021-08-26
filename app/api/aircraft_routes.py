# from flask import Blueprint, jsonify
# from flask_login import login_required
# from app.models import Aircraft

# aircraft_routes = Blueprint('aircraft', __name__)


# @aircraft_routes.route('/')
# @login_required
# def aircraft_all():
#     print('in Route')
#     aircrafts = Aircraft.query.all()
#     return {'aircraft': [aircraft.to_dict() for aircraft in aircrafts]}


# @aircraft_routes.route('/<int:id>')
# @login_required
# def aircraft(id):
#     single_aircraft = Aircraft.query.get(id)
#     return single_aircraft.to_dict()
