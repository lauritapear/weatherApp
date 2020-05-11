# WEATHER APP

Application to display forecast of an specified city

## To run Application 

1. First get an accuweather API token, you can get it by registering here:
https://developer.accuweather.com/

2. Login to your new accuweatheraccount: create a new app and get the API token.

3. Once you have your API token please update the following line on ```weather-service/.env``` with you token:
   ```TOKEN="Enter your accuweather API token"```

4. Once you have updated ```.env``` file please run:
   ```docker-compose up``` (Make sure docker is running on your machine)

And that is it 👏  you can now access weather app on port 3000

## To run Test

1. Navegate to ```weather-service folder``` and enter : ```npm test```
2. Navegate to ```weather-webapp folder``` and enter : ```npm test --watchAll```

## What I used
* ReactJS
* Express
* NodeJS
* Enzyme with Jest
* Riteway
* Docker
* Docker Compose
