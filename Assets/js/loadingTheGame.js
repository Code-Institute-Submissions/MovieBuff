//Movie Buff Game by MllrB
//------------------------------Game Variables------------------------------------

/** Holds the data that drives the ThreeOfAKind game */
const gameData = [];

/** Holds the data that drives the RolePlay game */
const mostPopular = [];

/** A copy of the game data for the current game/round  */
var currentGameSet = [];

/** Strings for populating game titles, descriptions and rules */
const games = [{
        name: "ThreeOfAKind",
        title: "3 of a Kind",
        description: "3 actors / 3 movies. Choose the movie that connects the actors",
    },
    {
        name: "RolePlay",
        title: "Role Play",
        description: "Choose the movie that featured the three characters shown"
    },
    {
        casualMode: "10 rounds, no penalty. Try to get 10 out of 10",
        survivalMode: "Infinite (ish) rounds but get one wrong and it's game over"
    }
];

/** Holds the top scores for each game type and mode
 * The index of this array also controls additions to the leaderboard and
 * game behaviour - which game board to set after logging an answer
 */

const topScores = [new Answers("ThreeOfAKind", "casual"),
    new Answers("ThreeOfAKind", "survival"),
    new Answers("RolePlay", "casual"),
    new Answers("RolePlay", "survival"),
];

/** The objects that populate the topScores[]  
 * @param {string}  game        Game type 
 * @param {string}  gameMode    Game mode 
 */

function Answers(game, gameMode) {
    this.gameName = game;
    this.mode = gameMode;
    this.rightAnswers = [];
    this.answerGiven = [];
    this.score = 0;
    this.bestScores = [0, 0, 0];
}

/** The objects that populate the gameData[] and the mostPopular[] 
 * @param {number}  filmID      The Movie DB movieID value
 * @param {string}  title       The Movie DB original_title
 * @param {string}  poster      The Movie DB movie poster image path
 * @param {number}  popular     The Movie DB popularity rating
 * @param {string}  blurb       The Movie DB movie synopsis
 * @param {number}  date        The Movie DB movie release date reduced to just the year
 */

function MovieData(filmID, title, poster, popular, blurb, date) {
    this.movieID = filmID;
    this.movieTitle = title;
    this.moviePoster = poster;
    this.popularity = popular;
    this.synopsis = blurb;
    this.releaseYear = date;
    this.castMembers = [];
}

/** The object that populates a movieData object's castMembers property
 * @param {number}  num         The Movie DB actorID
 * @param {string}  name        The Movie DB actor name
 * @param {string}  charName    The Movie DB character name
 * @param {number}  profilePic  The Movie DB actor image path
 */
function ActorData(num, name, charName, profilePic) {
    this.actorID = num;
    this.actorName = name;
    this.characterName = charName;
    this.actorImage = profilePic;
}


//------------------------------Game Loading Functions------------------------------------

/**
 * Gets and parses a page of movies from the API
 * @param {number} pageNumber   The page number you want to fetch from the API
 * @returns {object}            The page fetched from the API
 */
async function fetchTopRatedMovies(pageNumber) {

    var initialList = await fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${pageNumber}&api_key=86bde198d570a8a05979302fb3be8b11`);
    var listToReturn = await initialList.json();

    return listToReturn;
}

/**
 * Gets and parses the cast and crew for a movie from the API
 * @param {number} movieID   The movieID for the cast and crew to fetch from the API
 * @returns {Array}         Only the cast[] for the movieID passed
 */

async function fetchMovieCast(movieID) {
    var castData = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=86bde198d570a8a05979302fb3be8b11`);
    var castAndCrew = await castData.json();

    return castAndCrew.cast;
}

/**
 * Populates the gameData[] with a page worth of movieData objects
 * @param {Array} topRatedList   The array of movies to add to the gameData[]
 */

function populateGameData(topRatedList) {
    topRatedList.forEach((item) => {
        if (item.original_language == "en" && !item.adult) {

            var releaseDate = new Date(item.release_date);
            releaseDate = releaseDate.getFullYear();

            if (item.original_title == null) {
                if (item.name != null) {
                    var movieData = new MovieData(item.id, item.name, item.poster_path, item.popularity, item.overview, releaseDate);
                } else if (item.title != null) {
                    var movieData = new MovieData(item.id, item.title, item.poster_path, item.popularity, item.overview, releaseDate);
                }
            } else {
                var movieData = new MovieData(item.id, item.original_title, item.poster_path, item.popularity, item.overview, releaseDate);
            }

            gameData.push(movieData);

        }
    });
}

/**
 * Populates the the castMember property of a movieData object
 * @param {object}  movieObject     The movieData object onto which to add cast members
 * @param {Array}   cast            The cast of actors with which to populate the movieData object
 */

function populateCastMembers(movieObject, cast) {
    cast.forEach((item) => {
        if (item.profile_path != null) {
            var actor = new ActorData(item.id, item.name, item.character, item.profile_path);
            movieObject.castMembers.push(actor);
        }
    });
}


/**
 * Calls the functions necessary to load the game in sequence
 * Allows 2.5 seconds to acknowledge The MovieDB
 */

async function loadGame() {
    document.getElementById("gameWindow").innerHTML = `<img src="Assets/Media/3GFW2.gif" alt="loading">`;

    //get 30 pages of movies
    for (let i = 1; i < 30; i++) {
        var currentMoviesList = await fetchTopRatedMovies(i);
        await populateGameData(currentMoviesList.results);
    }

    //add cast members to each movie (not included in inital movie data)
    gameData.forEach(async(movieObject) => {
        var cast = await fetchMovieCast(movieObject.movieID);
        await populateCastMembers(movieObject, cast);

        //populating mostPopular movie array for RolePlay game to decrease difficulty
        if (movieObject.popularity > 10 && movieObject.releaseYear > 1970) {
            mostPopular.push(movieObject);
        }

    });

    setTimeout(() => {
        document.getElementById("gameWindow").innerHTML = `<div class="col-12 tmdb">
                                                                <img src="Assets/Media/TMDBLogo.png" alt="The Movie DataBase">
                                                            </div>
                                                            <div class="col-12 tmdb">
                                                                <p class="light-font">powered by The Movie DB</p>
                                                            </div>`;

        setTimeout(() => {
            chooseGame();
        }, 2500);
    }, 2000);

}

/**
 * Checks the screen dimensions 
 * If the width is less than the height 
 * Then assume mobile device and encourage the user to switch to landscape view
 * 
 * Finally - calls the load game function
 */
$(document).ready(() => {

    //show disclaimer if in portrait view on mobile device, otherwise just load
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var isFirstLoad = true;

    if (screenWidth < screenHeight) {
        document.getElementById("gameWindow").innerHTML = `<div class="col-12 rotate">
                                                                <img src="Assets/Media/rotate.png" alt="Please rotate the screen">
                                                            </div>
                                                            <div class="col-12 disclaimer">
                                                            <p> This game is optimised for landscape view.</p>
                                                            <p> I recommend switching to landscape view before continuing!</p>
                                                            </div>
                                                            <div class="col-12 rotate">
                                                                <button id="onwards" class="btn btn-success">Onwards!</button>
                                                            </div>`;

        $(window).on('orientationchange', () => {
            screenWidth = $(window).innerHeight();
            screenHeight = $(window).innerWidth();

            if (screenWidth > screenHeight && isFirstLoad) {
                isFirstLoad = false;
                loadGame();
            }

        })


        $('#onwards').on('click', () => {
            isFirstLoad = false;
            loadGame();
        })

    } else loadGame();
});