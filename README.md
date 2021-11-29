# On Course
*By Brad Sherwood - [Visit On Course](https://on-course-app.herokuapp.com/splash)*

[<img src="https://ibb.co/Ykx8jNX">]

**Table of Contents**
* [On Course at a Glance](#oncourse-at-a-glance)
* [Application Architecture & Technologies Used](#application-architecture)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion & Next Steps](#conclusion-and-next-steps)

## On Course at a Glance
On Course is a fullstack [MERN](https://www.geeksforgeeks.org/mern-stack/) app that lets pilots find and rent aircraft at their airport.

Users can also list their aircraft available for rent on the app.


## Application Architecture
As noted above, On Course is a fullstack MERN application. The majority of the application logic occurs within front end's [Redux](https://redux.js.org/) store.

The backend serves the frontend, responds to frontend requests, and interacts with the postgresql database. The backend works off a [Python](https://www.python.org/) framework called [flask](https://flask.palletsprojects.com/en/2.0.x/)

## Frontend Overview
On Course uses a [React-Redux](https://react-redux.js.org/) frontend framework to create a responsive and smooth user experience. The use of Redux allows all api calls to the backend to happen seamless, and update the apps content in a smooth fashion.

### Frontend Technologies Used:
#### React
React is used to provide the JSX that is used to serve the clients requests. Much of react was used within On Course, utilizing props, and state to full effect. This allows for a superior user experience that most other front end frameworks can't provide.

#### Redux
[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) library were used to manage application state and make fetch requests to the server for data.

Redux stores and sets information about the users flights and aircraft. When in the dashboard the flight component and aircraft component both use the store to grab that information. With the store the app can have easy access to any information about the users flights, or aircraft.

#### Auto display of aircraft
The flight form component has a feature where once you select an airport, all the aircraft available for rent at that airport are then displayed. This feature uses a special api call once an airport is selected to create a list of all aircrafts base airport. Once that list is created another api call is made to receive all aircraft at the selected airport.

## Backend Overview
On Course's backend works off a [Python](https://www.python.org/) framework called [flask](https://flask.palletsprojects.com/en/2.0.x/). Flask routes api calls and runs the server, while [SQLAlchemy](https://www.sqlalchemy.org/) interacts with the [postgresql](https://www.postgresql.org/) database.

### Backend Technologies Used
#### Flask
Flask is a Python module which allows the creation of backend servers. Traditionally used to serve [Jinja](https://jinja.palletsprojects.com/en/3.0.x/) templates, On Course uses it to route api called and interact with the database.

#### SQLAlchemy
On Course uses [SQLAlchemy](https://www.sqlalchemy.org/) as its ORM. It is used to interact with the database, whenever a new user, aircraft, or flight is created SQLAlchemy is used to create that instance in the database. It allows all instances to be represented as dictionaries, and easily created, modified, or deleted.

## Conclusion and Next Steps
On Course was an amazing experience, after earning my pilots licence in highschool it was a great opportunity  to combine both of my passions into one project. This project was so much fun to make, pulling on my experience in aviation.

**Next Steps:** Next steps for On Course are to implement third party apis. I want to implement the google maps api for flights, as well as weather information from various api calls.

Thanks for reading! ✌🏽
