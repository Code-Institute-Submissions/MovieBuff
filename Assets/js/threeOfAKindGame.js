//Movie Buff Game by MllrB


//-------------------------------------------------------3 OF A KIND GAME-----------------------------------------------------------

/**
 * Readies the game board for the ThreeOfAKind game type
 * @param {string} gameMode The game mode selected by the user. Values: either 'casual' or 'survival'
 */
function setThreeOfAKindBoard(gameMode) {

    document.getElementById("gameWindow").innerHTML = `<div class="col-12 x-button">
                                                            <span id="exit" class="fas fa-times-circle fa-2x exit-button"></span>
                                                        </div>
                                                        <div class="col-12 game-window">
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

    $("#exit").on('click', () => {
        resetAnswers();
        chooseGame();
    })
}

/**
 * Sets up the game board in casual mode
 * Choses the correct answer and populates the 2 wrong answers
 */

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

/**
 * Sets up the game board in survival mode
 * Choses the correct answer and populates the 2 wrong answers
 */

function playThreeOfAKindSurvival() {

    var actors = [];
    var movies = [];
    var chosenMovie;

    currentGameSet = shuffleArray(currentGameSet);
    chosenMovie = currentGameSet.shift();

    while (chosenMovie.castMembers.length < 3) {
        chosenMovie = currentGameSet.shift();
    }

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