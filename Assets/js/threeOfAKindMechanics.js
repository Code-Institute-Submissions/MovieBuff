//Movie Buff Game by MllrB

//-----------------------------Mechanincs for the 3 of a Kind Game--------------------------------

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

function getActors(movie) {
    var actors = [movie.castMembers[0], movie.castMembers[1], movie.castMembers[2]];
    return actors;
}