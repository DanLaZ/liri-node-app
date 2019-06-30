console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

const url = "https://rest.bandsintown.com/artists/" + "Cardi B" + "/events?app_id=codingbootcamp";

const axios = require("axios");
axios.get(url)
  .then(function (response) {
    // handle success
    var concertInfo = response.data[0];
   
    var venueCity = concertInfo.venue.city;
    var venueCountry = concertInfo.venue.country;
    var eventDate = concertInfo.datetime;
    

    var concertData = [
      "Concert Name: " + concertInfo.venue.name,
      "Location: " + venueCity + "," + venueCountry,
      "Date: " + eventDate,
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


