from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DecimalField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class AircraftForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  price = IntegerField('price', validators=[DataRequired()])
  manufacturer = StringField('manufacturer', validators=[DataRequired()])
  name = StringField('name', validators=[DataRequired()])
  year = IntegerField('year', validators=[DataRequired()])
  tail_number = StringField('tail_number', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  cover_img = StringField('cover_img', validators=[DataRequired()])
  avionics = StringField('avionics')
  ifr_cert = BooleanField('ifr_cert')
  need_IR = BooleanField('need_IR')
  need_CSEL = BooleanField('need_CSEL')
  need_CMEL = BooleanField('need_CMEL')
  need_ATP = BooleanField('need_ATP')
  need_CFI = BooleanField('need_CFI')
  need_CFII = BooleanField('need_CFII')
  need_MEI = BooleanField('need_MEI')
  need_complex = BooleanField('need_complex')
  need_performance = BooleanField('need_performance')
  airport = StringField('airport', validators=[DataRequired()])
  type = StringField('type', validators=[DataRequired()])
  gph = IntegerField('gph', validators=[DataRequired()])
  fuel_capacity = IntegerField('fuel_capacity', validators=[DataRequired()])
  cruise_speed = IntegerField('cruise_speed', validators=[DataRequired()])
  usable_load = IntegerField('usable_load', validators=[DataRequired()])
  seats = IntegerField('seats', validators=[DataRequired()])
  poh = StringField('poh')
