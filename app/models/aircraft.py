from .db import db

class Aircraft(db.model):
    __tablename__ = 'aircraft'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    price = db.Column(db.Numeric(6,2))
    manufacturer = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    cover_img = db.Column(db.String(), nullable=False)
    avionics = db.Column(db.String, nullable=False)
    ifr_cert = db.Column(db.Boolean)
    need_IR = db.Column(db.Boolean)
    need_CSEL = db.Column(db.Boolean)
    need_CMEL = db.Column(db.Boolean)
    need_ATP = db.Column(db.Boolean)
    need_CFI = db.Column(db.Boolean)
    need_CFII = db.Column(db.Boolean)
    need_MEI = db.Column(db.Boolean)
    need_complex = db.Column(db.Boolean)
    need_performace = db.Column(db.Boolean)
    airport = db.Column(db.String, nullable=False)
    type = db.Column(db.String)
    gph = db.Column(db.Integer)
    fuel_capacity = db.Column(db.Integer)
    cruise_speed = db.Column(db.Integer)
    usable_load = db.Column(db.Integer)
    seats = db.Column(db.Integer)
    poh = db.Column(db.String)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'price': self.price,
            'manufacturer': self.manufacturer,
            'name': self.name,
            'description': self.description,
            'cover_img': self.cover_img,
            'avionics': self.avionics,
            'ifr_cert': self.ifr_cert,
            'need_IR': self.need_IR,
            'need_CSEL': self.need_CSEL,
            'need_CMEL': self.need_CMEL,
            'need_ATP': self.need_ATP,
            'need_CFI': self.need_CFI,
            'need_CFII': self.need_CFII,
            'need_MEI': self.need_MEI,
            'need_complex': self.need_complex,
            'need_performace': self.need_performace,
            'airport': self.airport,
            'type': self.type,
            'gph': self.gph,
            'fuel_capacity': self.fuel_capacity,
            'cruise_speed': self.cruise_speed,
            'usable_load': self.usable_load,
            'seats': self.seats,
            'poh': self.poh,
        }
