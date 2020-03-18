//Movie Buff Game by MllrB

//------------------------------Game Variables------------------------------------

const gameData = [];
const mostPopular = [];
var currentGameSet = [];

const games = [{ name: "ThreeOfAKind", title: "3 of a Kind", description: "You're shown 3 actors and 3 movies<br> Choose the movie that connects the actors" },
    { name: "RolePlay", title: "Role Play", description: "Choose the movie that featured the three characters shown" }
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

    //get 20 pages of movies
    for (let i = 1; i < 30; i++) {
        var currentMoviesList = await fetchTopRatedMovies(i);
        await populateGameData(currentMoviesList.results);
    }

    //add cast members to each movie (not included in inital movie data)
    gameData.forEach(async(movieObject) => {
        var cast = await fetchMovieCast(movieObject.movieID);
        await populateCastMembers(movieObject, cast);

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
        }, 3000);
    }, 2000);

}

function chooseGame() {
    document.getElementById("titleRow").innerHTML = "";

    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-types">
                                                                    <button onclick="chooseGameMode('ThreeOfAKind')" class="btn btn-success special-elite-font">3 of a Kind</button>
                                                                    <button onclick="chooseGameMode('RolePlay')" class="btn btn-success special-elite-font">Role Play</button>
                                                                </div>`;
}

function chooseGameMode(gameType) {

    if (gameType == "ThreeOfAKind") {
        currentGameSet = [...gameData];
    } else if (gameType == "RolePlay") {
        currentGameSet = [...mostPopular];
    }

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
//------------------ shuffle - randomInt - check answer - game counter - draw movies row - draw actors row - draw character row-----------------


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function shuffleArray(arrayToShuffle) {
    for (let i = arrayToShuffle.length - 1; i > 0; --i) {
        let j = Math.floor(Math.random() * (i + 1));
        // let j = getRandomIntInclusive(0, arrayToShuffle.length - 1);
        let temp = arrayToShuffle[i];
        arrayToShuffle[i] = arrayToShuffle[j];
        arrayToShuffle[j] = temp;
    }
    return arrayToShuffle;
}


function setMovieRow(movies) {
    movies = shuffleArray(movies);
    document.getElementById("movies-row").innerHTML =
        `<div id="${movies[0].movieID}" class="col-4 movies movie-1">
                <img id="movie-${movies[0].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[0].moviePoster}" width=100%>
            </div>
            <div id="${movies[1].movieID}" class="col-4 movies">
                <img id="movie-${movies[1].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[1].moviePoster}" width=100%>
            </div>
            <div id="${movies[2].movieID}" class="col-4 movies movie-3">
                <img id="movie-${movies[2].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[2].moviePoster}" width=100%>
            </div> `;

    return movies;

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

    document.getElementById("actor-1").innerHTML = `<img id="firstActor" src="${firstActorImg}" alt="${actors[0].actorName}" width=100%><label for="firstActor" class="actor-name light-font">${actors[0].actorName}</label>`;
    document.getElementById("actor-2").innerHTML = `<img id="secondActor" src="${secondActorImg}" alt="${actors[1].actorName}" width=100%><label for="firstActor" class="actor-name light-font">${actors[1].actorName}</label>`;
    document.getElementById("actor-3").innerHTML = `<img id="thirdActor" src="${thirdActorImg}" alt="${actors[2].actorName}" width=100%><label for="firstActor" class="actor-name light-font">${actors[2].actorName}</label>`;
}

$(window).resize(() => {
    var imgWidth = $('#firstActor').width();
    $('.actor-name').width(imgWidth);
});

function showLeaderboard(index) {
    document.getElementById("gameWindow").innerHTML = `<div class="col-12 leaderboard-container">
    <div class="col-6 left-column trophy"><img src="Assets/Media/goldenglobesmall.png"></div>
    <div class="row right-row current-score">
        <div id="you" class="col-7">YOU GOT</div>
        <div id="player-score" class="col-5">${topScores[index].score}</div>
    </div>
    <div class="row right-row centered">
        <div class="col-12 leaderboard">
            <h2 class="headers">Leaderboard</h2>
        </div>
        <div class="col-12 high-scores">
            <span class="leaderboard-scores">1st</span>
            <span class="leaderboard-scores">${topScores[index].bestScores[0]}</span>
        </div>
        <div class="col-12 high-scores">
            <span class="leaderboard-scores">2nd</span>
            <span class="leaderboard-scores">${topScores[index].bestScores[1]}</span>
        </div>
        <div class="col-12 high-scores">
            <span class="leaderboard-scores">3rd</span>
            <span class="leaderboard-scores">${topScores[index].bestScores[2]}</span>
        </div>

    </div>

</div>

<div class="col-12 bottom-buttons">
    <button class="btn btn-success">Replay</button>
    <button class="btn btn-success" onclick="resetAnswers()">Home</button>
</div>`


}

function resetAnswers() {
    topScores.forEach((item) => {
        item.rightAnswers = [];
        item.answerGiven = [];
        item.score = 0;
    });

    chooseGame();
}

function logAnswers(movies, chosenMovie, index) {

    // Casual Mode Responses
    if (index === 0 || index === 2) {
        document.getElementById(`movie-${movies[0].movieID}`).addEventListener("click", function() {
            topScores[index].rightAnswers.push(chosenMovie);
            topScores[index].answerGiven.push(movies[0]);
            if (chosenMovie.movieID == movies[0].movieID) {
                topScores[index].score++;
                $(this).addClass("correct-answer");
            } else $(this).addClass("incorrect-answer");

            setTimeout(() => {
                if (topScores[index].rightAnswers.length > 9) {
                    setBestScores(index);
                    showLeaderboard(index);
                } else if (index === 0) {
                    setThreeOfAKindBoard(topScores[index].mode, false, false);
                } else if (index === 2) {
                    setRolePlayBoard(topScores[index].mode, false, false);
                } else console.log("Error: topScores Index neither 0 nor 2");
            }, 1000);
        });
        document.getElementById(`movie-${movies[1].movieID}`).addEventListener("click", function() {
            topScores[index].rightAnswers.push(chosenMovie);
            topScores[index].answerGiven.push(movies[1]);
            if (chosenMovie.movieID == movies[1].movieID) {
                topScores[index].score++;
                $(this).addClass("correct-answer");
            } else $(this).addClass("incorrect-answer");

            setTimeout(() => {
                if (topScores[index].rightAnswers.length > 9) {
                    setBestScores(index);
                    showLeaderboard(index);
                } else if (index === 0) {
                    setThreeOfAKindBoard(topScores[index].mode, false, false);
                } else if (index === 2) {
                    setRolePlayBoard(topScores[index].mode, false, false);
                } else console.log("Error: topScores Index neither 0 nor 2");
            }, 1000);
        });
        document.getElementById(`movie-${movies[2].movieID}`).addEventListener("click", function() {
            topScores[index].rightAnswers.push(chosenMovie);
            topScores[index].answerGiven.push(movies[2]);
            if (chosenMovie.movieID == movies[2].movieID) {
                topScores[index].score++;
                $(this).addClass("correct-answer");
            } else $(this).addClass("incorrect-answer");

            setTimeout(() => {
                if (topScores[index].rightAnswers.length > 9) {
                    setBestScores(index);
                    showLeaderboard(index);
                } else if (index === 0) {
                    setThreeOfAKindBoard(topScores[index].mode, false, false);
                } else if (index === 2) {
                    setRolePlayBoard(topScores[index].mode, false, false);
                } else console.log("Error: topScores Index neither 0 nor 2");
            }, 1000);
        });
    } else if (index === 1 || index === 3) {
        //Survival Mode Responses
        document.getElementById(`movie-${movies[0].movieID}`).addEventListener("click", function() {
            topScores[index].rightAnswers.push(chosenMovie);
            topScores[index].answerGiven.push(movies[0]);
            if (chosenMovie.movieID == movies[0].movieID) {
                topScores[index].score++;
                $(this).addClass("correct-answer");
                setTimeout(() => {
                    if (index === 1) {
                        setThreeOfAKindBoard(topScores[index].mode, false, false);
                    } else if (index === 3) {
                        setRolePlayBoard(topScores[index].mode, false, false);
                    } else console.log("Error: topScores Index neither 1 nor 3");
                }, 1000);
            } else {
                $(this).addClass("incorrect-answer");
                setTimeout(() => {
                    setBestScores(index);
                    showLeaderboard(index);
                }, 1000);
            }


        });
        document.getElementById(`movie-${movies[1].movieID}`).addEventListener("click", function() {
            topScores[index].rightAnswers.push(chosenMovie);
            topScores[index].answerGiven.push(movies[1]);
            if (chosenMovie.movieID == movies[1].movieID) {
                topScores[index].score++;
                $(this).addClass("correct-answer");
                setTimeout(() => {
                    if (index === 1) {
                        setThreeOfAKindBoard(topScores[index].mode, false, false);
                    } else if (index === 3) {
                        setRolePlayBoard(topScores[index].mode, false, false);
                    } else console.log("Error: topScores Index neither 1 nor 3");
                }, 1000);
            } else {
                $(this).addClass("incorrect-answer");
                setTimeout(() => {
                    setBestScores(index);
                    showLeaderboard(index);
                }, 1000);
            }

        });
        document.getElementById(`movie-${movies[2].movieID}`).addEventListener("click", function() {
            topScores[index].rightAnswers.push(chosenMovie);
            topScores[index].answerGiven.push(movies[2]);
            if (chosenMovie.movieID == movies[2].movieID) {
                topScores[index].score++;
                $(this).addClass("correct-answer");
                setTimeout(() => {
                    if (index === 1) {
                        setThreeOfAKindBoard(topScores[index].mode, false, false);
                    } else if (index === 3) {
                        setRolePlayBoard(topScores[index].mode, false, false);
                    } else console.log("Error: topScores Index neither 1 nor 3");
                }, 1000);
            } else {
                $(this).addClass("incorrect-answer");
                setTimeout(() => {
                    setBestScores(index);
                    showLeaderboard(index);
                }, 1000);
            }
        });
    }
}

function setBestScores(index) {
    if (topScores[index].score > topScores[index].bestScores[0]) {
        topScores[index].bestScores.pop();
        topScores[index].bestScores.unshift(topScores[index].score)
    } else if (topScores[index].score > topScores[index].bestScores[1]) {
        topScores[index].bestScores[2] = topScores[index].bestScores[1];
        topScores[index].bestScores[1] = topScores[index].score;
    } else if (topScores[index].score > topScores[index].bestScores[2]) {
        topScores[index].bestScores[2] = topScores[index].score;
    }
}


//-------------------------------------------------------3 OF A KIND GAME-----------------------------------------------------------

function setThreeOfAKindBoard(gameMode, isFirstRound, isLastGo) {

    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-window">
                                                            <div class="row actors-row">
                                                                <div id="actor-1" class="col-4 actors"></div>
                                                                <div id="actor-2" class="col-4 actors"></div>
                                                                <div id="actor-3" class="col-4 actors"></div>
                                                            </div>
                                                            <div id="movies-row" class="row movies-row">
                                                            </div>

                                                        </div>`;

    if (gameMode == "casual") {
        playThreeOfAKindCasual();
    } else if (gameMode == "survival") {
        playThreeOfAKindSurvival();
    }
}

function playThreeOfAKindCasual() {
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

    //wait a moment to make sure chosenMovie is defined
    setTimeout(async() => {
        // populate choice of actors for chosen movie

        actors = await getActors(chosenMovie);

        // set the game board

        await setActorsRow(actors);

        movies = await setMovieRow(movies);

        await logAnswers(movies, chosenMovie, 0);
    }, 100);



}

function playThreeOfAKindSurvival() {

    var actors = [];
    var movies = [];
    var chosenMovie;

    currentGameSet = shuffleArray(currentGameSet);
    chosenMovie = currentGameSet.shift();
    console.log("currentgameset:");
    console.log(currentGameSet);
    console.log("chosen Movie");
    console.log(chosenMovie);

    //set choice of 3 movies including the correct answer
    movies[0] = chosenMovie;
    movies[1] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];
    movies[2] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];

    while (movies[1].movieID == movies[2].movieID) {
        movies[2] = currentGameSet[getRandomIntInclusive(0, currentGameSet.length - 1)];
        console.log("duplicate movies");
    }

    //Wait a moment to make sure chosenMovie is defined
    setTimeout(async() => {
        // populate choice of actors for chosen movie
        actors = await getActors(chosenMovie);

        // set the game board    

        await setActorsRow(actors);

        movies = setMovieRow(movies);

        await logAnswers(movies, chosenMovie, 1);

    }, 100);

}

function getActors(movie) {
    var actors = [movie.castMembers[0], movie.castMembers[1], movie.castMembers[2]];
    return actors;
}

//-------------------------------------------------------ROLE PLAY GAME-----------------------------------------------------------

function setRolePlayBoard(gameMode, isFirstRound, isLastGo) {

    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-window">
                                                            <div class="row character-row">                                        
                                                                <div id="chosen-character" class="col-8 movie-character"></div>
                                                            </div>
                                                            <div id="movies-row" class="row movies-row">
                                                            </div>

                                                        </div>`;

    if (gameMode == "casual") {
        playRolePlayCasual();
    } else if (gameMode == "survival") {
        playRolePlaySurvival();
    }
}

async function playRolePlayCasual() {

    var movies = [];
    var chosenMovie;

    currentGameSet = shuffleArray(currentGameSet);
    var testmovie = currentGameSet[0];
    var testcharacters = await getCharacters(testmovie);

    wellIsit = isCharNameInMovieTitle(testmovie.movieTitle, testcharacters);
    console.log("char name is in movie title before while loop: " + wellIsit);

    while (wellIsit) {
        currentGameSet.shift();
        testmovie = currentGameSet[0];
        testcharacters = await getCharacters(testmovie);
        wellIsit = isCharNameInMovieTitle(testmovie.movieTitle, testcharacters);
    }

    console.log("char name is in movie title after while loop: " + wellIsit);

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

    var chosenMovieCharacters = await getCharacters(movies[0]);
    document.getElementById("chosen-character").innerHTML = `<p class="characters light-font">${chosenMovieCharacters[0]}</p>
                                                            <p class="characters light-font">${chosenMovieCharacters[1]}</p>
                                                            <p class="characters light-font">${chosenMovieCharacters[2]}</p>`;

    movies = setMovieRow(movies);
    await logAnswers(movies, chosenMovie, 2);

}

async function playRolePlaySurvival() {

    var movies = [];
    var chosenMovie;


    currentGameSet = shuffleArray(currentGameSet);
    var testmovie = currentGameSet[0];
    var testcharacters = await getCharacters(testmovie);

    wellIsit = isCharNameInMovieTitle(testmovie.movieTitle, testcharacters);
    console.log("char name is in movie title before while loop: " + wellIsit);

    while (wellIsit) {
        currentGameSet.shift();
        testmovie = currentGameSet[0];
        testcharacters = await getCharacters(testmovie);
        wellIsit = isCharNameInMovieTitle(testmovie.movieTitle, testcharacters);
    }

    console.log("char name is in movie title after while loop: " + wellIsit);

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

    var chosenMovieCharacters = await getCharacters(movies[0]);
    document.getElementById("chosen-character").innerHTML = `<p class="characters light-font">${chosenMovieCharacters[0]}</p>
                                                            <p class="characters light-font">${chosenMovieCharacters[1]}</p>
                                                            <p class="characters light-font">${chosenMovieCharacters[2]}</p>`;

    movies = setMovieRow(movies);
    await logAnswers(movies, chosenMovie, 3);
}

function getCharacters(movie) {

    var characterNames = [];
    console.log(movie.movieTitle);

    for (let i = 0; i < 3; i++) {
        characterNames.push(movie.castMembers[i].characterName);
    }

    characterNames.forEach((name, index) => {
        if (name.indexOf("(") !== -1) {
            var newName = "";
            for (let i = 0; i < name.indexOf("("); i++) {
                newName += name[i];
            }
            characterNames[index] = newName;
        }
    });

    return characterNames;

}

function isCharNameInMovieTitle(movie, characters) {
    var isIt = false;
    movie = movie.split(" ");
    console.log(movie);

    characters.forEach((item, index) => {
        var newArray = item.split(" ");
        characters[index] = newArray;
    });

    console.log(characters);

    characters.forEach((namesArray) => {
        var indexToRemove = namesArray.indexOf("");
        if (indexToRemove > -1) {
            namesArray.splice(indexToRemove, 1);
            console.log(namesArray);
        }
    })

    movie.forEach((item) => {
        characters.forEach((namesArray) => {
            namesArray.forEach((names) => {
                console.log("item |" + item + "| : name |" + names + "|");
                console.log(item.indexOf(names));
                if (item.indexOf(names) != -1) { isIt = true; }
            });
        });
    });

    return isIt;
}