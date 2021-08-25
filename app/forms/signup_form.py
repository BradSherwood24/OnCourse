from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def full_name_exists(form, field):
    # Checking if username is already in use
    full_name = field.data
    user = User.query.filter(User.full_name == full_name).first()
    if user:
        raise ValidationError('name is already in use.')


class SignUpForm(FlaskForm):
    full_name = StringField(
        'full_name', validators=[DataRequired(), full_name_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    home_airport = StringField('home_airport', validators=[DataRequired()])
    total_time = IntegerField('total_time', validators=[DataRequired()])
    img = StringField('img')
    is_IR = BooleanField('is_IR')
    is_CSEL = BooleanField('is_CSEL')
    is_CMEL = BooleanField('is_CMEL')
    is_ATP = BooleanField('is_ATP')
    is_CFI = BooleanField('is_CFI')
    is_CFII = BooleanField('is_CFII')
    is_MEI = BooleanField('is_MEI')
    is_complex = BooleanField('is_complex')
    is_performance = BooleanField('is_performance')
