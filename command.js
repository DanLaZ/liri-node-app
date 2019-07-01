var axios = require("axios");
var moment = require('moment');

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");


var Command = function() {

  var divider = "\n------------------------------------------------------------\n";

  this.findConcert = function(artist) {

    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

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

      fs.appendFile("log.txt", concertData + "\n\n", function() {
        
      });
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

      fs.appendFile("log.txt", songData + "\n\n", function() {
        
      });
    });
  }

  this.findMovie = function(movie) {

    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

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

      fs.appendFile("log.txt", omdbData + "\n\n", function() {
        
      });
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



module.exports = Command;