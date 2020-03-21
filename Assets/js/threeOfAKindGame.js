//Movie Buff Game by MllrB




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
    <button id="replay" class="btn btn-success light-font">Replay</button>
    <button id="home" class="btn btn-success light-font">Home</button>
</div>`

    $("#replay").click(() => {
        resetAnswers();
        if (index == 0) {
            setThreeOfAKindBoard('casual');
        } else if (index == 1) {
            setThreeOfAKindBoard('survival');
        } else if (index == 2) {
            setRolePlayBoard('casual');
        } else if (index == 3) {
            setRolePlayBoard('survival');
        }
    });

    $("#home").click(() => {
        resetAnswers();
        setTimeout(() => {
            chooseGame();
        }, 100);
    });
}

function resetAnswers() {
    topScores.forEach((item) => {
        item.rightAnswers = [];
        item.answerGiven = [];
        item.score = 0;
    });
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
                    setThreeOfAKindBoard(topScores[index].mode);
                } else if (index === 2) {
                    if (currentGameSet.length < 10) {
                        console.log("careful now")
                    }
                    setRolePlayBoard(topScores[index].mode);
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
                    setThreeOfAKindBoard(topScores[index].mode);
                } else if (index === 2) {
                    setRolePlayBoard(topScores[index].mode);
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
                    setThreeOfAKindBoard(topScores[index].mode);
                } else if (index === 2) {
                    setRolePlayBoard(topScores[index].mode);
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
                        setThreeOfAKindBoard(topScores[index].mode);
                    } else if (index === 3) {
                        if (currentGameSet.length < 10) {
                            console.log("careful now")
                        }
                        setRolePlayBoard(topScores[index].mode);
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
                        setThreeOfAKindBoard(topScores[index].mode);
                    } else if (index === 3) {
                        if (currentGameSet.length < 10) {
                            console.log("careful now")
                        }
                        setRolePlayBoard(topScores[index].mode);
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
                        setThreeOfAKindBoard(topScores[index].mode);
                    } else if (index === 3) {
                        if (currentGameSet.length < 10) {
                            console.log("careful now")
                        }
                        setRolePlayBoard(topScores[index].mode);
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

function setThreeOfAKindBoard(gameMode) {

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
        console.log(actors);
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

    while (chosenMovie.castMembers.length < 3) {
        chosenMovie = currentGameSet.shift();
    }
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
        console.log(actors);
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

function setRolePlayBoard(gameMode) {

    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-window">
                                                            <div class="row character-row">                                        
                                                                <div id="chosen-character" class="movie-character"></div>
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