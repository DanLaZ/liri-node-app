const axios = require("axios");
const moment = require('moment');
const fs = require("fs");

var Command = function() {

    var divider = "\n------------------------------------------------------------\n\n";

    this.findConcert = function() {

        const url = "https://rest.bandsintown.com/artists/" + "Cardi B" + "/events?app_id=codingbootcamp";

        axios.get(url).then(function (response) {
            // handle success
            var concertInfo = response.data[0];
        
            var venueCity = concertInfo.venue.city;
            var venueCountry = concertInfo.venue.country;
            var eventDate = concertInfo.datetime;

            var concertData = [
              "Concert Name: " + concertInfo.venue.name,
              "Location: " + venueCity + ", " + venueCountry,
              "Date: " + moment(eventDate).format("MM/DD/YYYY")
            ].join("\n");

            console.log(concertData);
        })
        fs.appendFile("log.txt", concertData + divider, function(err) {
          if (err) throw err;
          console.log(concertData);
        });
        
    }
};



module.exports = Command;