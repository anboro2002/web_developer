import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const APIurlCoordinates = "http://api.openweathermap.org/geo/1.0/direct"
const APIurlWeather = "https://api.openweathermap.org/data/3.0/onecall";
const APIkeyCoordinates = "2b84d9a79c39675d6dbfbb03b2ab3a61";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

function kelvinToCelsius(kelvin){
    return Math.round(kelvin - 273.15);
}

app.get("/", (req, res) => {
    res.render("index.ejs");
    
});

app.get("/submit", async (req, res) => {
    try {
        const locationCoordinates = await axios.get(
            `${APIurlCoordinates}?q=${req.query.location}&appid=${APIkeyCoordinates}`
        );
        const response = await axios.get(
            `${APIurlWeather}?lat=${locationCoordinates.data[0].lat}&lon=${locationCoordinates.data[0].lon}&exclude{current,minutely,hourly,alerts}&appid=${APIkeyCoordinates}`
        );
        
        const weatherCondition = response.data.daily[1].summary;
        const weatherLocation = req.query.location;
        const weatherMin = kelvinToCelsius(response.data.daily[1].temp.min);
        const weatherMax = kelvinToCelsius(response.data.daily[1].temp.max);

        res.render("index.ejs", {
            weatherCondition: weatherCondition,
            weatherLocation: weatherLocation,
            weatherMax: weatherMax,
            weatherMin: weatherMin
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})