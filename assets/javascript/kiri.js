require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

// main arguments
var control = process.argv[2];
var quest = process.argv[3];

// concert-this
function concertSearch(artist) {
    var concertDate = 0;
    var logUp = [];

    // If the user doesn't type a artist in, the program will prompt user for a name'
    if (artist === undefined) {
        console.log("Please input a band name.");
        return;
    };


    // This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("Next Shows for " + artist + " Are:");
            logUp.push("\n" + "Next Shows for " + artist + " Are:");

            console.log("");
            logUp.push("\n");

            // console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                console.log("Venue Name: " + response.data[i].venue.name);
                logUp.push("\n" + "Venue Name: " + response.data[i].venue.name);

                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                logUp.push("\n" + "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);

                concertDate = moment(response.data[i].datetime).format('LLL');
                console.log("Concert Date: " + concertDate);
                logUp.push("\n" + "Concert Date: " + concertDate);

                console.log("");
                logUp.push("\n");
            };
            logIt(logUp);
        });
};

// spotify-this-song
function spotifySearch(song) {
    // If the user doesn't type a artist in, the program will prompt user for a name'
    if (song === undefined) {
        song = "The Sign";
    };

    var logUp = [];

    // This will show the following information about the song in your terminal/bash window
    spotify.search({ type: 'track', query: song, limit: "5" })
        .then(function (response) {

            for (let i = 0; i < response.tracks.items.length; i++) {
                var artist = [];

                console.log(i + 1);
                logUp.push("\n" + (i + 1));

                for (let j = 0; j < response.tracks.items[i].artists.length; j++) {
                    artist.push(" " + response.tracks.items[i].artists[j].name);
                };
                console.log("Artist(s): " + artist);
                logUp.push("\n" + "Artist(s): " + artist);

                console.log("Song Name: " + response.tracks.items[i].name);
                logUp.push("\n" + "Song Name: " + response.tracks.items[i].name);

                console.log("Preview Link: " + response.tracks.items[i].preview_url);
                logUp.push("\n" + "Preview Link: " + response.tracks.items[i].preview_url);

                console.log("Album Name: " + response.tracks.items[i].album.name);
                logUp.push("\n" + "Album Name: " + response.tracks.items[i].album.name);

                console.log("");
                logUp.push("\n");
            };
            logIt(logUp);

        }).catch(function (err) {
            console.log('Error occurred: ' + err);
        });
};

// movie-this
function omdbSearch(movieName) {
    var logUp = [];
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    };
    // This will output the following information to your terminal/bash window:
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            // console.log(response.data);
            console.log("Movie Title: " + response.data.Title);
            logUp.push("\n" + "Movie Title: " + response.data.Title);

            console.log("Movie Released: " + response.data.Released);
            logUp.push("\n" + "Movie Released: " + response.data.Released);

            console.log("Movie IMDB Ratings: " + response.data.Ratings[0].Value);
            logUp.push("\n" + "Movie IMDB Ratings: " + response.data.Ratings[0].Value);

            console.log("Movie Rotten Tomatoes Ratings: " + response.data.Ratings[1].Value);
            logUp.push("\n" + "Movie Rotten Tomatoes Ratings: " + response.data.Ratings[1].Value);

            console.log("Movie Country: " + response.data.Country);
            logUp.push("\n" + "Movie Country: " + response.data.Country);

            console.log("Movie Language: " + response.data.Language);
            logUp.push("\n" + "Movie Language: " + response.data.Language);

            console.log("Movie Plot: " + response.data.Plot);
            logUp.push("\n" + "Movie Plot: " + response.data.Plot);

            console.log("Movie Actors: " + response.data.Actors);
            logUp.push("\n" + "Movie Actors: " + response.data.Actors);
            logIt(logUp);
        });
};

if (control === "movie-this") {
    omdbSearch(quest);
} else
    if (control === "spotify-this-song") {
        spotifySearch(quest);
    } else
        if (control === "concert-this") {
            concertSearch(quest);
        } else
            if (control === "do-what-it-says") {
                doWhat();
            };



// do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhat() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        var quer = dataArr[1].replace(/['"]+/g, '');

        console.log("");
        if (dataArr[0] === "movie-this") {
            omdbSearch(quer);
        } else
            if (dataArr[0] === "spotify-this-song") {
                spotifySearch(quer);
            } else
                if (dataArr[0] === "concert-this") {
                    concertSearch(quer);
                }
    });
}

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
function logIt(text) {

    text.push("\n" + "*********************************************************************" + "\n");

    fs.appendFile("log.txt", text, function (err) {

        if (err) {
            return console.log(err);
        }

        // Otherwise, it will print: "movies.txt was updated!"
        console.log("log.txt was updated!");

    });
}