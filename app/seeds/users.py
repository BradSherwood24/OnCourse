from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo', email='demo@aa.io', password='password', total_time=150, home_airport='KGRR', img='https://st.depositphotos.com/1003098/3961/i/950/depositphotos_39613187-stock-photo-confident-pilot-in-front-of.jpg')
    marnie = User(
        full_name='marnie', email='marnie@aa.io', password='password', total_time=150, home_airport='KGRR')
    bobbie = User(
        full_name='bobbie', email='bobbie@aa.io', password='password', total_time=150, home_airport='KGRR')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
