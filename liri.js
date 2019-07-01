var Command = require("./command.js");
var command = new Command();
var fs = require("fs");

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
else if (search === "movie") {
    console.log("Searching for movie info...");
    command.findMovie(term);
}
else {
    console.log(
        "\n" +
        "List of commands: concert, song & movie." 
        + "\n\n" + 
        "Type the command before the search term!"
        + "\n\n" +
        "Example: node liri.js song I Want It That Way"
        + "\n" 
    );

    fs.readFile("./random.txt", 'utf8', function(err, data) {
        if (err) throw err;
        command.findSong(data);
    });
}


