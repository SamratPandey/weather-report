const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { log } = require('console');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req, res){
    const apikey = "";//add your openweather api key here
    const query = req.body.city;
    const units = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&lang=en&apikey=" + apikey;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const  temp = weatherData.main.temp;

            const icon = weatherData.weather[0].icon;
            const imageUrl =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The tempature in "+query +" is "+temp+"</h1>")
            res.write("<img src=" +imageUrl+ ">")
            res.send();
     
        })

    })
})






app.listen(3000,function(){
    console.log("Server running on port on 3000")
})