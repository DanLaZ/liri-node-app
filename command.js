const axios = require("axios");
const moment = require('moment');
const fs = require("fs");

var Command = function() {

    var divider = "\n------------------------------------------------------------\n\n";

    this.findConcert = function(artist) {

        const url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(url).then(function (response) {
            // handle success
            var concertInfo = response.data[0];
            var venueInfo = concertInfo.venue;
        
            var venueCity = venueInfo.city;
            var venueCountry = venueInfo.country;
            var eventDate = concertInfo.datetime;

            var concertData = [
              "Concert Name: " + concertInfo.venue.name,
              "Location: " + venueCity + ", " + venueCountry,
              "Date: " + moment(eventDate).format("MM/DD/YYYY")
            ].join("\n");

            console.log(concertData);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
          // always executed
        });
     
      
        
    }
};

const URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + "Blade";

axios.get(URL).then(function (response) {
    
    var omdbInfo = response.data;

    var omdbData = [
        "Title: " + omdbInfo.Title,
        "Year Released: " + omdbInfo.Year,
        "IMDB Rating: " + omdbInfo.Ratings[0].Value,
        "Rotten Tomatoes Rating: " + omdbInfo.Ratings[1].Value,
        "Country Movie was Produced in: " + omdbInfo.Country,
        "Language: " + omdbInfo.Language,
        "Actors: " + omdbInfo.Actors 
    ].join("\n");

    console.log(omdbData);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.finally(function () {
  // always executed
});







// fs.appendFile("log.txt", concertData + divider, function() {
//     console.log(concertData);
//   });

module.exports = Command;