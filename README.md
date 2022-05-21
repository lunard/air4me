# Air4Me

I like social projects and this aims to be a collaborative project.
The purpose is to allow everyone to contribute to map the air quality during his own mobility:
are you going to work, are you walking, are you traveling?
Takes with you the air4me sensor and install the air4me app: you will help to integrate air quality data and you will able to air see the air quality near to you!

# About this repository
This is the backend of the air4me project.
The backend has 3 main purposes:
- import air quality data form the Open Data Hub in MongoDB Atlas, in order to make geospatial queries
- provide a REST path for sending new sensor data to the MQTT broker of the NOI tech park
- provide a REST path to query the Open Data Hub data synked into Mongo, in order to use geospatial query
- provide a REST path to send data stored by the Flutter app when the smartphone was offline (bluk insert).. (todo)


# Technologies
The project is a Nest.js application, where the Mongoose is used as ORM

The sync is made by using Cron task

An MQTT ClientProxy is used to send data.

# Docker
The Dockerfile is provided: please ask me for the env file to pass to docker run (via --enf_file)
