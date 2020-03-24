//Movie Buff Game by MllrB

//-----------------------------Mechanics for the Role Play Game--------------------------------

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