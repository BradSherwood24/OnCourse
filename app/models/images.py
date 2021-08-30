from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    img_src = db.Column(db.String, nullable=False)
    aircraft_id = db.Column(db.Integer,  db.ForeignKey('aircraft.id'), nullable=False)

    aircraft = db.relationship("Aircraft", back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'img_src': self.img_src,
            'aircraft_id': self.aircraft_id
        }
