require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var Command = require("./command.js");
var command = new Command();

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");