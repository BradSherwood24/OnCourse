from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    is_IR = db.Column(db.Boolean)
    is_CSEL = db.Column(db.Boolean)
    is_CMEL = db.Column(db.Boolean)
    is_ATP = db.Column(db.Boolean)
    is_CFI = db.Column(db.Boolean)
    is_CFII = db.Column(db.Boolean)
    is_MEI = db.Column(db.Boolean)
    is_complex = db.Column(db.Boolean)
    is_performace = db.Column(db.Boolean)
    total_time = db.Column(db.Integer, nullable=False)
    home_airport = db.Column(db.String(5), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_IR': self.is_IR,
            'is_CSEL': self.is_CSEL,
            'is_CMEL': self.is_CMEL,
            'is_ATP': self.is_ATP,
            'is_CFI': self.is_CFI,
            'is_CFII': self.is_CFII,
            'is_MEI': self.is_MEI,
            'is_complex': self.is_complex,
            'is_performace': self.is_performace,
            'total_time': self.total_time,
            'home_airport': self.home_airport
        }
