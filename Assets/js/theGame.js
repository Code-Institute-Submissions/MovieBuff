//Movie Buff Game by MllrB

//------------------------------Game Variables------------------------------------

const gameData = [];
var currentGameSet = [];
var correctAnswer;
var goNumber;
var correctAnswersGiven = [];

const games = [{ name: "ThreeOfAKind", title: "3 of a Kind", description: "You're shown 3 actors and 3 movies<br> Choose the movie that connects the actors" },
    { name: "RolePlay", title: "Role Play", description: "You're shown 3 movies and a character<br> Choose the movie that featured the character" }
];

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
                                                                <p class="light-font">powered by The Movie DB</p>
                                                            </div>`;

        setTimeout(() => {
            chooseGame();
        }, 3000);
    }, 2000);

}

function chooseGame() {
    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-types">
                                                                    <button onclick="chooseGameMode('ThreeOfAKind')" class="btn btn-success special-elite-font">3 of a Kind</button>
                                                                    <button onclick="chooseGameMode('RolePlay')" class="btn btn-success special-elite-font">Role Play</button>
                                                                </div>`;
}

function chooseGameMode(gameType) {

    console.log(gameType);
    currentGameSet = [...gameData];
    var thisGame;

    games.forEach((item) => {
        if (gameType == item.name) {
            thisGame = item;
        }
    });
    document.getElementById("titleRow").innerHTML = `<div class="col-12">
                                                        <h2 class="light-font">${thisGame.title}</h2>
                                                        <h6 class="light-font">${thisGame.description}</h6>  
                                                    </div>`;
    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-types">
                                                            <button onclick="set${gameType}Board('casual', true, false)" class="btn btn-success special-elite-font">Casual</button>
                                                            <button onclick="set${gameType}Board('survival', true, false)" class="btn btn-success special-elite-font">Survival</button>
                                                        </div>`;
}

//---------------------------------------------GAME MECHANICS---------------------------------------------
//------------------ shuffle - randomInt - check answer - game counter - draw movies row -----------------


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function shuffleArray(arrayToShuffle) {
    for (let i = arrayToShuffle.length - 1; i > 0; --i) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arrayToShuffle[i];
        arrayToShuffle[i] = arrayToShuffle[j];
        arrayToShuffle[j] = temp;
    }
    return arrayToShuffle;
}

async function checkAnswer(clickedMovie, correctAnswer, isLastGo, whichGame, gameMode) {

    if (clickedMovie.id == correctAnswer.movieID) {
        $(`#movie-${clickedMovie.id}`).addClass("correct-answer");
        correctAnswersGiven.push(correctAnswer);
    } else {
        $(`#movie-${clickedMovie.id}`).addClass("incorrect-answer");
        if (gameMode == "survival") {
            isLastGo = true;
        }
        console.log("incorrect");
    }

    setTimeout(() => {

        document.getElementById("gameWindow").innerHTML = "";
        if (isLastGo) {
            alert(`Game Over! you got ${correctAnswersGiven.length} correct`);

            currentGameSet = [...gameData];
            correctAnswersGiven = [];
            document.getElementById("titleRow").innerHTML = `<h2>Movie Buff</h2>`;
            chooseGame();
        } else if (whichGame == "ThreeOfAKind") {
            setThreeOfAKindBoard(gameMode, false, false);
        }
    }, 1000);

}


function setGameCounter(isFirstRound) {
    //set number of goes and decrement each time until 0;
    if (isFirstRound) {
        goNumber = 9;
    } else {
        goNumber--;
    }

    //check if this is the last go

    if (goNumber == 0) {
        return true;
    } else return false;
}

function setMovieRow(movies, isLastGo, whichGame, gameMode) {
    movies = shuffleArray(movies);
    document.getElementById("movies-row").innerHTML =
        `<div id="${movies[0].movieID}" class="col-4 movies movie-1" onclick="checkAnswer(this, correctAnswer, ${isLastGo}, '${whichGame}', '${gameMode}')">
                <img id="movie-${movies[0].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[0].moviePoster}" width=100%>
            </div>
            <div id="${movies[1].movieID}" class="col-4 movies" onclick="checkAnswer(this, correctAnswer, ${isLastGo}, '${whichGame}', '${gameMode}')">
                <img id="movie-${movies[1].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[1].moviePoster}" width=100%>
            </div>
            <div id="${movies[2].movieID}" class="col-4 movies movie-3" onclick="checkAnswer(this, correctAnswer, ${isLastGo}, '${whichGame}', '${gameMode}')">
                <img id="movie-${movies[2].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[2].moviePoster}" width=100%>
            </div> `;
}

async function setActorsRow(actors) {
    await actorsRow(actors);

    var imgWidth = $('#firstActor').width();
    $('.actor-name').width(imgWidth);
}

function actorsRow(actors) {
    var firstActorImg = `https://image.tmdb.org/t/p/w500${actors[0].actorImage}`;
    var secondActorImg = `https://image.tmdb.org/t/p/w500${actors[1].actorImage}`;
    var thirdActorImg = `https://image.tmdb.org/t/p/w500${actors[2].actorImage}`;

    document.getElementById("actor-1").innerHTML = `<img id="firstActor" src="${firstActorImg}" alt="${actors[0].actorName}" width=100% class="hidden"><label for="firstActor" class="actor-name light-font">${actors[0].actorName}</label>`;
    document.getElementById("actor-2").innerHTML = `<img id="secondActor" src="${secondActorImg}" alt="${actors[1].actorName}" width=100% class="hidden"><label for="firstActor" class="actor-name light-font">${actors[1].actorName}</label>`;
    document.getElementById("actor-3").innerHTML = `<img id="thirdActor" src="${thirdActorImg}" alt="${actors[2].actorName}" width=100% class="hidden"><label for="firstActor" class="actor-name light-font">${actors[2].actorName}</label>`;
}

$(window).resize(() => {
    var imgWidth = $('#firstActor').width();
    $('.actor-name').width(imgWidth);
});


//-------------------------------------------------------3 OF A KIND GAME-----------------------------------------------------------

function setThreeOfAKindBoard(gameMode, isFirstRound, isLastGo) {

    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-window">
                                                            <div class="row actors-row">
                                                                <div id="actor-1" class="col-4 actors hidden"></div>
                                                                <div id="actor-2" class="col-4 actors hidden"></div>
                                                                <div id="actor-3" class="col-4 actors hidden"></div>
                                                            </div>
                                                            <div id="movies-row" class="row movies-row">
                                                            </div>

                                                        </div>`;

    if (gameMode == "casual") {
        playThreeOfAKindCasual(isFirstRound, isLastGo);
    } else if (gameMode == "survival") {
        playThreeOfAKindSurvival(isFirstRound, isLastGo);
    }
}

function playThreeOfAKindCasual(isFirstRound, isLastGo) {
    console.log("three of a kind casual");

    var actors = [];
    var movies = [];
    var chosenMovie;

    currentGameSet = shuffleArray(currentGameSet);
    chosenMovie = currentGameSet.shift();
    correctAnswer = chosenMovie;

    //set choice of 3 movies including the correct answer
    movies[0] = chosenMovie;
    movies[1] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];
    movies[2] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];

    while (movies[1].movieID == movies[2].movieID) {
        movies[2] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];
        console.log("duplicate movies");
    }
    // populate choice of actors for chosen movie
    //setTimeout used to fix bug that was trying to set the actors before the movies array was fully populated
    setTimeout(async() => {
        for (let i = 0; i < 3; i++) {
            console.log(chosenMovie.castMembers[i]);
            if (chosenMovie.castMembers[i] == null) {
                actors[i] = chosenMovie.castMembers[i + 3];
            } else {
                actors[i] = chosenMovie.castMembers[i];
            }
        }

        isLastGo = setGameCounter(isFirstRound);

        // set the game board

        await setActorsRow(actors);

        await setMovieRow(movies, isLastGo, "ThreeOfAKind", "casual");

    }, 100);

}

function playThreeOfAKindSurvival(isFirstRound) {
    console.log("three of a kind survival");

    var actors = [];
    var movies = [];
    var chosenMovie;

    currentGameSet = shuffleArray(currentGameSet);
    chosenMovie = currentGameSet.shift();
    correctAnswer = chosenMovie;

    //set choice of 3 movies including the correct answer
    movies[0] = chosenMovie;
    movies[1] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];
    movies[2] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];

    while (movies[1].movieID == movies[2].movieID) {
        movies[2] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];
        console.log("duplicate movies");
    }
    // populate choice of actors for chosen movie
    for (let i = 0; i < 3; i++) {
        console.log(chosenMovie.castMembers[i]);
        if (chosenMovie.castMembers[i].actorImage == null) {
            actors[i] = chosenMovie.castMembers[i + 3];
        } else {
            actors[i] = chosenMovie.castMembers[i];
        }
    }

    if (isFirstRound) {
        goNumber = 0;
    }

    // set the game board

    setActorsRow(actors);

    setMovieRow(movies, false, "ThreeOfAKind", "survival");
}