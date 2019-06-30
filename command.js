const axios = require("axios");
const moment = require('moment');
const fs = require("fs");
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);


var Command = function() {

  var divider = "\n------------------------------------------------------------\n";

  this.findConcert = function(artist) {

    const url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(url).then(function (response) {
       
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

      console.log(divider + concertData + divider);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  this.findSong = function(track) {
    spotify.search({ type: 'track', query: track}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
      var songInfo = data.tracks.items[0];
  
      var songData = [
        "Artist: " + songInfo.artists[0].name,
        "Song: " + songInfo.name,
        "Album: " + songInfo.album.name,
        "Preview Link: " + songInfo.preview_url     
      ].join("\n");
  
      console.log(divider + songData + divider);
    });
  }

  this.findMovie = function(movie) {

    const URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

    axios.get(URL).then(function (response) {

      var omdbInfo = response.data;

      var omdbData = [
        "Title: " + omdbInfo.Title,
        "Year Released: " + omdbInfo.Year,
        "IMDB Rating: " + omdbInfo.Ratings[0].Value,
        "Rotten Tomatoes Rating: " + omdbInfo.Ratings[1].Value,
        "Production Location: " + omdbInfo.Country,
        "Languages: " + omdbInfo.Language,
        "Actors: " + omdbInfo.Actors 
      ].join("\n");

      console.log(divider + omdbData + divider);
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

// var Spotify = require('node-spotify-api');
 
// var spotify = new Spotify({
//   id: "de189e77423b4163ace6f66602d6cb61",
//   secret: "b3f253788e8e43d9bbe6a1898acdaacf"
// });

// fs.appendFile("log.txt", concertData + divider, function() {
//     console.log(concertData);
//   });

module.exports = Command;