from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    rating = db.Column(db.Integer)
    aircraft_id = db.Column(db.Integer,  db.ForeignKey('aircraft.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    aircraft = db.relationship("Aircraft", back_populates='comments')
    user = db.relationship("User", back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'event_id': self.aircraft_id,
            'user_id': self.user_id,
            'aircraft': self.aircraft.to_dict(),
            'user': self.user.to_dict(),
        }
