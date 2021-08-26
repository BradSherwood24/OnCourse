from .db import db

class Flight(db.Model):
    __tablename__ = 'flights'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    aircraft_id = db.Column(db.Integer, db.ForeignKey('aircraft.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    airports = db.Column(db.String, nullable=False)
    departure = db.Column(db.String)
    arrival = db.Column(db.String)
    distance = db.Column(db.Integer)
    save = db.Column(db.Boolean)

    aircraft = db.relationship("Aircraft", back_populates='comments')
    user = db.relationship("User", back_populates="events")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'aircraft_id': self.aircraft_id,
            'name': self.name,
            'departure': self.departure,
            'arrival': self.arrival,
            'airports': self.airports,
            'distance': self.distance,
            'save': self.save,
            'aircraft': self.aircraft.to_dict(),
            'user': self.user.to_dict(),
        }
