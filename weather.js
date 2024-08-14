const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
const citydata = req.body.cityName

const url =" https://api.openweathermap.org/data/2.5/weather?q="+ citydata +"&appid=*****&units=metric"

https.get(url, function (response) {
  console.log(response.statusCode);
response.on("data", function(data){
const weatherData = JSON.parse(data);

  const temp = weatherData.main.temp
  console.log(temp);
const weatherDescription = weatherData.weather[0].description;
const icon = weatherData.weather[0].icon;
console.log(icon);
const imageUrl =" https://openweathermap.org/img/wn/"+icon+"@2x.png"

//   const object = {
//     name: "morris",
//     age: 24,
//     gender: "male"
//   }
// console.log(JSON.stringify(object));


res.write("<p>The weather is currently " + weatherDescription + "</p>");
res.write("<h1> The temperature in "+ citydata +" is " + temp + " degrees celcius.</h1>");
res.write(" <img src = "+ imageUrl +">");
res.write("server is running");
res.send()
});
});

} );
//});


app.listen(port, function () { console.log("server is running on port 3000");

});
