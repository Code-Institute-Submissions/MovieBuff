//Movie Buff Game by MllrB

//-----------------------------Mechanincs for the Role Play Game--------------------------------

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