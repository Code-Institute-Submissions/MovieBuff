const gameData = [];

function MovieData(filmID, title, poster, blurb) {
    this.movieID = filmID;
    this.movieTitle = title;
    this.moviePoster = poster;
    this.synopsis = blurb;
    this.castMembers = [];
}

function ActorData(num, name, charName, profilePic) {
    this.actorID = num;
    this.actorName = name;
    this.characterName = charName;
    this.actorImage = profilePic;
}

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
        if (item.original_language == "en") {
            if (item.original_title == null) {
                if (item.name != null) {
                    var movieData = new MovieData(item.id, item.name, item.poster_path, item.overview);
                } else if (item.title != null) {
                    var movieData = new MovieData(item.id, item.title, item.poster_path, item.overview);
                }
            } else {
                var movieData = new MovieData(item.id, item.original_title, item.poster_path, item.overview);
            }

            gameData.push(movieData);
        }
    });
}

async function loadGame() {
    document.getElementById("gameWindow").innerHTML = `<img src="Assets/Media/3GFW2.gif" alt="loading">`;

    //get 20 pages of movies
    for (let i = 1; i < 20; i++) {
        var currentMoviesList = await fetchTopRatedMovies(i);
        await populateGameData(currentMoviesList.results);
    }

    //add cast members to each movie (not included in inital movie data)
    gameData.forEach(async(movieObject) => {
        var cast = await fetchMovieCast(movieObject.movieID);
        cast.forEach((item, index, array) => {
            if (item.profile_path != null) {
                var actor = new ActorData(item.id, item.name, item.character, item.profile_path);
                movieObject.castMembers.push(actor);
            }
        });
    });



    console.log(gameData);

    setTimeout(() => {
        document.getElementById("gameWindow").innerHTML = `<div class="col-12 tmdb">
                                                                <img src="Assets/Media/TMDBLogo.png" alt="The Movie DataBase">
                                                            </div>
                                                            <div class="col-12 tmdb">
                                                                <p class="special-elite-font white">powered by The Movie DB</p>
                                                            </div>`
    }, 3000);

}