//Movie Buff Game by MllrB

//-----------------------------Mechanics for the Role Play Game--------------------------------
/**
 * Selects the 3 characters for the movie chosen as the correct answer
 * Removes '(voice)' from character names that have it
 * @param {object} movie The chosen movie/correct answer
 * @returns {Array}      The three characters for the chosen movie
 */
function getCharacters(movie) {

    var characterNames = [];

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

/**
 * Checks to see if the character name is in the movie title
 * @param {object} movie        The chosen movie/correct answer
 * @param {Array}  characters   The three characters for the chosen movie
 * @returns {boolean}           True/False depending on if the character name is in the movie title
 */

function isCharNameInMovieTitle(movie, characters) {
    var isIt = false;
    movie = movie.split(" ");

    characters.forEach((item, index) => {
        var newArray = item.split(" ");
        characters[index] = newArray;
    });

    characters.forEach((namesArray) => {
        var indexToRemove = namesArray.indexOf("");
        if (indexToRemove > -1) {
            namesArray.splice(indexToRemove, 1);
        }
    })

    movie.forEach((item) => {
        characters.forEach((namesArray) => {
            namesArray.forEach((names) => {
                if (item.indexOf(names) != -1) { isIt = true; }
            });
        });
    });

    return isIt;
}