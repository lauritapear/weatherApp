## WEATHER APP

Application to display forecast of an specified city


To run Application, first get an accuweather API token, you can get it by registering here:
https://developer.accuweather.com/

You can then create a new app and get the API token.

Once you have your API token please update the following line on ```weather-service/.env``` with you token:
- ```TOKEN="Enter your accuweather API token"```

Once you have updated ```.env``` file please run:
- ```docker-compose up``` (Make sure docker is running on your machine)

And that is it :) you can now access weather app on port 3000
