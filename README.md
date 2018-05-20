[![Build Status](https://travis-ci.org/uchemukolo/Maintenance-tracker-app.svg?branch=develop)](https://travis-ci.org/uchemukolo/Maintenance-tracker-app)
[![Coverage Status](https://coveralls.io/repos/github/uchemukolo/Maintenance-tracker-app/badge.svg?branch=develop)](https://coveralls.io/github/uchemukolo/Maintenance-tracker-app?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/028ca3922bb7fa66b323/maintainability)](https://codeclimate.com/github/uchemukolo/Maintenance-tracker-app/maintainability)

# Maintenance-tracker-app
Maintenance Tracker App is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.

<p> <a href='https://uchemukolo.github.io/Maintenance-tracker-app/'>Click Here to view App on Heroku</a></p>

<h1>Features</h1>
<p>The app has the following features for the respective categories;</p>

<h3>A User can:</h3>

<ul>
<li>create an account and login.</li>
<li>make maintenance or repairs request.</li>
<li>view all his/her requests.</li>
<li>view the details of a single request.</li>
<li>update a request, if it is yet to be approved.</li>
</ul>
<h3>An admin can:<h3>
<ul>
<li>approve/disapprove a repair/maintenance request.</li>
<li>mark request as resolved once it is done.</li>
<li>view all maintenance/repairs requests on the application.</li>
<li>filter requests.</li>
<li>view the details of a request.</li>
</ul>
<h3>Technologies</h3>
<p>The application uses Nodejs and Express frameworks on the server.</p>
<p>On the front-end, HTML, CSS & JavaScript are used for templating.</p>
<p>Postgres Database</p>

<h3>Installation</h3>
<p>Follow the steps below to setup a local development environment.

<p>Clone the repository from a terminal git clone <a href='https://github.com/uchemukolo/Maintenance-tracker-app'></a></p>
<p>Navigate to the project directory cd Maintenance-tracker-app</p>
<p>Run npm install on the terminal to install dependencies.</p>
<p>Run npm start to start the application.</p>

<h3>Testing</h3>

<p>Run npm test</p>

<h3>Api EndPoints</h3>
<table>
EndPoint	Functionality
POST /users/login	=> Logs in a user.
GET /users/requests	Gets all requests of a logged in user (if user is an admin, gets all requests in database).
GET /users/requests/:id	Get a single request through it's id.
POST /users/requests	Creates a new request
PUT /users/requests/:id	Updates a request (admin can resolve, approve, or disapprove a request through this endpoint)
DELETE /users/requests/:id	Deletes a request (admin can trash(remove from admin's workspace) a request through this endpoint)
</table>
