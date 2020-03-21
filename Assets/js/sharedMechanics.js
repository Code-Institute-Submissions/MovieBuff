//Movie Buff Game by MllrB

//---------------------------------------------SHARED GAME MECHANICS---------------------------------------------
//------------------ shuffle - randomInt - draw movies row - log answers - log top scores - reset answers -----------------


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

function resetAnswers() {
    topScores.forEach((item) => {
        item.rightAnswers = [];
        item.answerGiven = [];
        item.score = 0;
    });
}