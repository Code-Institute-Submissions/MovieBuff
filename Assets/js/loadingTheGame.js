//Movie Buff Game by MllrB
//------------------------------Game Variables------------------------------------

const gameData = [];
const mostPopular = [];
var currentGameSet = [];

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

const topScores = [new Answers("ThreeOfAKind", "casual"),
    new Answers("ThreeOfAKind", "survival"),
    new Answers("RolePlay", "casual"),
    new Answers("RolePlay", "survival"),
];

function Answers(game, gameMode) {
    this.gameName = game;
    this.mode = gameMode;
    this.rightAnswers = [];
    this.answerGiven = [];
    this.score = 0;
    this.bestScores = [0, 0, 0];
}

function MovieData(filmID, title, poster, popular, blurb, date) {
    this.movieID = filmID;
    this.movieTitle = title;
    this.moviePoster = poster;
    this.popularity = popular;
    this.synopsis = blurb;
    this.releaseYear = date;
    this.castMembers = [];
}

function ActorData(num, name, charName, profilePic) {
    this.actorID = num;
    this.actorName = name;
    this.characterName = charName;
    this.actorImage = profilePic;
}


//------------------------------Game Loading Functions------------------------------------


async function fetchTopRatedMovies(pageNumber) {

    var initialList = await fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${pageNumber}&api_key=86bde198d570a8a05979302fb3be8b11`);
    var listToReturn = await initialList.json();

    return listToReturn;
}

async function fetchMovieCast(movieID) {
    var castData = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=86bde198d570a8a05979302fb3be8b11`);
    var castAndCrew = await castData.json();

    return castAndCrew.cast;
}


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

function populateCastMembers(movieObject, cast) {
    cast.forEach((item, index, array) => {
        if (item.profile_path != null) {
            var actor = new ActorData(item.id, item.name, item.character, item.profile_path);
            movieObject.castMembers.push(actor);
        }
    });
}

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
            console.log(gameData);
            chooseGame();
        }, 3000);
    }, 2000);

}

loadGame();