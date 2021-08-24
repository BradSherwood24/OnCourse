from .db import db


class Images(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    img_src = db.Column(db.String, nullable=False)
    aircraft_id = db.Column(db.Integer,  db.ForeignKey('aircraft.id'), nullable=False)

    aircraft = db.relationship("Aircraft", back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'img_src': self.img_src,
            'user_id': self.user_id,
            'aircraft': self.aircraft.to_dict(),
        }
