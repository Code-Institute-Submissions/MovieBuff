//Movie Buff Game by MllrB

//-------------------------------------------------------ROLE PLAY GAME-----------------------------------------------------------

/**
 * Readies the game board for the RolePlay game type
 * @param {string} gameMode The game mode selected by the user. Values: either 'casual' or 'survival'
 */
function setRolePlayBoard(gameMode) {

    document.getElementById("gameWindow").innerHTML = `<div class="col-12 x-button">
                                                            <span id="exit" class="fas fa-times-circle fa-2x exit-button"></span>
                                                        </div>
                                                        <div class="col-12 game-window">
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

    $("#exit").on('click', () => {
        resetAnswers();
        chooseGame();
    })
}

/**
 * Sets up the game board in casual mode
 * Choses the correct answer and populates the 2 wrong answers
 */

async function playRolePlayCasual() {

    var movies = [];
    var chosenMovie;

    currentGameSet = shuffleArray(currentGameSet);
    var testmovie = currentGameSet[0];
    var testcharacters = await getCharacters(testmovie);

    wellIsit = isCharNameInMovieTitle(testmovie.movieTitle, testcharacters);

    while (wellIsit || testcharacters.length < 3) {
        currentGameSet.shift();
        testmovie = currentGameSet[0];
        testcharacters = await getCharacters(testmovie);
        wellIsit = isCharNameInMovieTitle(testmovie.movieTitle, testcharacters);
    }

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

/**
 * Sets up the game board in survival mode
 * Choses the correct answer and populates the 2 wrong answers
 */

async function playRolePlaySurvival() {

    var movies = [];
    var chosenMovie;

    if (currentGameSet.length < 5) {
        currentGameSet = [...mostPopular];
    }

    currentGameSet = shuffleArray(currentGameSet);
    var testmovie = currentGameSet[0];
    var testcharacters = await getCharacters(testmovie);

    wellIsit = isCharNameInMovieTitle(testmovie.movieTitle, testcharacters);

    while (wellIsit || testcharacters.length < 3) {
        currentGameSet.shift();
        testmovie = currentGameSet[0];
        testcharacters = await getCharacters(testmovie);
        wellIsit = isCharNameInMovieTitle(testmovie.movieTitle, testcharacters);
    }

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