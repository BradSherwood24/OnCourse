from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Aircraft, db
from app.forms import AircraftForm

aircraft_routes = Blueprint('aircraft', __name__)


@aircraft_routes.route('/')
@login_required
def aircraft_all():
    print('in Route')
    aircrafts = Aircraft.query.all()
    return {'aircraft': [aircraft.to_dict() for aircraft in aircrafts]}


@aircraft_routes.route('/<int:id>')
@login_required
def aircraft(id):
    aircrafts = Aircraft.query.filter(Aircraft.user_id == id).all()
    return {'aircraft': [aircraft.to_dict() for aircraft in aircrafts]}


@aircraft_routes.route('/', methods=['POST'])
def aircraftPost():
  print('IN ROUTE~!~~~~!!!!!!!')
  form = AircraftForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    aircraft = Aircraft(
      user_id=form.data['user_id'],
      price=form.data['price'],
      manufacturer=form.data['manufacturer'],
      name=form.data['name'],
      description=form.data['description'],
      cover_img=form.data['cover_img'],
      avionics=form.data['avionics'],
      ifr_cert=form.data['ifr_cert'],
      need_IR=form.data['need_IR'],
      need_CSEL=form.data['need_CSEL'],
      need_CMEL=form.data['need_CMEL'],
      need_ATP=form.data['need_ATP'],
      need_CFI=form.data['need_CFI'],
      need_CFII=form.data['need_CFII'],
      need_MEI=form.data['need_MEI'],
      need_complex=form.data['need_complex'],
      need_performance=form.data['need_performance'],
      airport=form.data['airport'],
      type=form.data['type'],
      gph=form.data['gph'],
      fuel_capacity=form.data['fuel_capacity'],
      cruise_speed=form.data['cruise_speed'],
      usable_load=form.data['usable_load'],
      seats=form.data['seats'],
      poh=form.data['poh']
    )

    db.session.add(aircraft)
    db.session.commit()
    print('inside validation p', aircraft.to_dict())
    return {'aircraft': [aircraft.to_dict()]}
  return {'errors': [form.errors]}
