//Movie Buff Game by MllrB

//---------------------------------------------SHARED GAME MECHANICS---------------------------------------------
//------------------ shuffle - randomInt - draw movies row - log answers - log top scores - reset answers -----------------

/**
 * Gets a random number between two given values
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @returns {number}   A random number between min and max values
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

/**
 * Shuffles an array
 * @param {array} arrayToShuffle    The array in need of a good shuffling
 * @returns {array}                 The shuffled array
 */
function shuffleArray(arrayToShuffle) {
    for (let i = arrayToShuffle.length - 1; i > 0; --i) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arrayToShuffle[i];
        arrayToShuffle[i] = arrayToShuffle[j];
        arrayToShuffle[j] = temp;
    }
    return arrayToShuffle;
}

/**
 * Displays the movies for this round in a random order
 * @param {array} movies    The movies for the current round of the game
 * @returns {array}         Returns the shuffled movie to keep track of
 *                          current order.
 */

function setMovieRow(movies) {
    movies = shuffleArray(movies);
    document.getElementById("movies-row").innerHTML =
        `<div id="${movies[0].movieID}" class="col-12 col-md-4 movies movie-1">
                <img id="movie-${movies[0].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[0].moviePoster}" width=100%>
            </div>
            <div id="${movies[1].movieID}" class="col-12 col-md-4 movies">
                <img id="movie-${movies[1].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[1].moviePoster}" width=100%>
            </div>
            <div id="${movies[2].movieID}" class="col-12 col-md-4 movies movie-3">
                <img id="movie-${movies[2].movieID}" src="https://image.tmdb.org/t/p/w500/${movies[2].moviePoster}" width=100%>
            </div> `;

    return movies;

}

/**
 * Logs the answer given for each round
 * @param {movies}      array   The list of possible answers
 * @param {chosenMovie} object  The correct answer
 * @param {index}       var     The current game type + mode: topScores[index]
 */

function logAnswers(movies, chosenMovie, index) {

    // Casual Mode Responses
    if (index === 0 || index === 2) {
        movies.forEach((movie) => {
            document.getElementById(`movie-${movie.movieID}`).addEventListener("click", function() {
                topScores[index].rightAnswers.push(chosenMovie);
                topScores[index].answerGiven.push(movie);
                if (chosenMovie.movieID == movie.movieID) {
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
        });
    } else if (index === 1 || index === 3) { //Survival Mode Responses

        movies.forEach((movie) => {
            document.getElementById(`movie-${movie.movieID}`).addEventListener("click", function() {
                topScores[index].rightAnswers.push(chosenMovie);
                topScores[index].answerGiven.push(movies);
                if (chosenMovie.movieID == movie.movieID) {
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

        });
    }
}


/**
 * Places the player score for the current game in the 
 * topScores[index].bestScores array.
 * 
 * @param {index} var the index of the topScores array
 * denoting the current game type and mode.
 */

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

/** Resets the rightAnswers, answerGiven and score
 * properties for each Answers object in the
 * topScores array
 * */
function resetAnswers() {
    topScores.forEach((item) => {
        item.rightAnswers = [];
        item.answerGiven = [];
        item.score = 0;
    });
}