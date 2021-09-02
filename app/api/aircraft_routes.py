from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Aircraft, db, Image
from app.forms import AircraftForm
import simplejson as json

aircraft_routes = Blueprint('aircraft', __name__)


@aircraft_routes.route('/')
@login_required
def aircraft_all():
    print('in Route')
    aircrafts = Aircraft.query.all()
    return {'aircraft': [aircraft.to_dict() for aircraft in aircrafts]}


@aircraft_routes.route('/user/<int:id>')
@login_required
def aircraft(id):
    aircrafts = Aircraft.query.filter(Aircraft.user_id == id).all()
    return json.dumps({'aircraft': [aircraft.to_dict() for aircraft in aircrafts]})


@aircraft_routes.route('/search', methods=['POST'])
@login_required
def aircraft_search():
    data = request.get_json()
    airport = data['airport']
    aircrafts = Aircraft.query.filter(Aircraft.airport.ilike(f'%{airport}%')).all()
    print('DATA!!!!', aircrafts)
    return json.dumps({'aircraft': [aircraft.to_dict() for aircraft in aircrafts]})


@aircraft_routes.route('/aircraft/<int:id>')
@login_required
def aircraftOne(id):
    aircraft = Aircraft.query.filter(Aircraft.id == id).first()
    return json.dumps(aircraft.to_dict())


@aircraft_routes.route('/<int:id>', methods=['DELETE'])
def aircraftDelete(id):
  aircraft = Aircraft.query.filter(Aircraft.id == id).first()
  db.session.delete(aircraft)
  db.session.commit()
  return {'aircraft': id}

@aircraft_routes.route('/', methods=['POST'])
def aircraftPost():
  form = AircraftForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    aircraft = Aircraft(
      user_id=form.data['user_id'],
      price=form.data['price'],
      manufacturer=form.data['manufacturer'],
      name=form.data['name'],
      year=form.data['year'],
      tail_number=form.data['tail_number'],
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
    print('AIRCRAFT NAME', aircraft.name)

    db.session.add(aircraft)
    db.session.commit()
    print('inside validation p', aircraft.to_dict())
    return json.dumps({'aircraft': [aircraft.to_dict()]})
  return {'errors': [form.errors]}


@aircraft_routes.route('/update/<int:id>', methods=['PATCH'])
def Update(id):
  aircraft = Aircraft.query.filter(Aircraft.id == id).first()
  print(aircraft.name)
  data = request.get_json()
  aircraft.user_id=data['user_id']
  aircraft.price=data['price']
  aircraft.manufacturer=data['manufacturer']
  aircraft.name=data['name']
  aircraft.description=data['description']
  aircraft.cover_img=data['cover_img']
  aircraft.avionics=data['avionics']
  aircraft.ifr_cert=data['ifr_cert']
  aircraft.need_IR=data['need_IR']
  aircraft.need_CSEL=data['need_CSEL']
  aircraft.need_CMEL=data['need_CMEL']
  aircraft.need_ATP=data['need_ATP']
  aircraft.need_CFI=data['need_CFI']
  aircraft.need_CFII=data['need_MEI']
  aircraft.need_complex=data['need_complex']
  aircraft.need_performance=data['need_performance']
  aircraft.airport=data['airport']
  aircraft.type=data['type']
  aircraft.gph=data['gph']
  aircraft.fuel_capacity=data['fuel_capacity']
  aircraft.cruise_speed=data['cruise_speed']
  aircraft.usable_load=data['usable_load']
  aircraft.seats=data['seats']
  aircraft.poh=data['poh']
  db.session.commit()
  return json.dumps({'aircraft': [aircraft.to_dict()]})


@aircraft_routes.route('/image', methods=['POST'])
def imagePost():
  data = request.get_json()
  print('DATA!!!', data)
  img = Image(
    img_src=data['img_src'],
    aircraft_id=data['aircraft_id'],
  )
  db.session.add(img)
  db.session.commit()
  return json.dumps(img.to_dict())
