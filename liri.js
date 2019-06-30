require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var Command = require("./command.js");
var command = new Command();

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (search === "concert") {
    console.log("Searching for concert info...");
    command.findConcert(term);
} 
else if (search === "song") {
    console.log("Searching for song info...");
    command.findSong(term);
}
else {
    console.log("Searching for movie info...");
    command.findMovie(term);
}