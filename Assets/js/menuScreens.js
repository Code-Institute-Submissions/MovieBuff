//Movie Buff Game by MllrB

//--------------------------------------Choose Game and Mode + Show Leaderboard----------------------------------------------
function chooseGame() {
    var screenWidth = $(window).innerWidth();
    var lpp = "bottom"; //leftPopoverPlacment

    if (screenWidth < 768) {
        lpp = "top";
    }
    document.getElementById("titleRow").innerHTML = `<h1 id="title" class="headers">Movie Buff</h1>`;

    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-types">
                                                            <button id="threeofakind" data-toggle="popover" data-content="${games[0].description}" data-placement="${lpp}" class="btn btn-success light-font">3 of a Kind</button>
                                                            <button id="roleplay" data-toggle="popover" data-content="${games[1].description}" data-placement="bottom" class="btn btn-success light-font">Role Play</button>
                                                        </div>`;

    if (screenWidth < 768) {
        $("#threeofakind").popover('show');
        $("#roleplay").popover('show');
    }

    $("#threeofakind").mouseenter(() => {
        $("#threeofakind").popover('show');
    });
    $("#threeofakind").mouseleave(() => {
        $("#threeofakind").popover('hide');
    });
    $("#threeofakind").on('click', () => {
        $("#threeofakind").popover('hide');
        $("#roleplay").popover('hide');
        chooseGameMode('ThreeOfAKind', lpp);
    });

    $("#roleplay").mouseenter(() => {
        $("#roleplay").popover('show');
    });
    $("#roleplay").mouseleave(() => {
        $("#roleplay").popover('hide');
    });
    $("#roleplay").on('click', () => {
        $("#threeofakind").popover('hide');
        $("#roleplay").popover('hide');
        chooseGameMode('RolePlay', lpp);
    });
}

function chooseGameMode(gameType, lpp) {

    //Display the chosen game type title
    var thisGame;

    games.forEach((item) => {
        if (gameType == item.name) {
            thisGame = item;
        }
    });
    document.getElementById("titleRow").innerHTML = `<div class="col-12">
                                                        <h2 class="game-title">${thisGame.title}</h2> 
                                                    </div>`;

    //Display game mode options
    document.getElementById("gameWindow").innerHTML = `<div class="col-12 game-types">
                                                            <button id="casualMode" data-toggle="popover" data-content="${games[2].casualMode}" data-placement="${lpp}" class="btn btn-success light-font">Casual</button>
                                                            <button id="survivalMode" data-toggle="popover" data-content="${games[2].survivalMode}" data-placement="bottom" class="btn btn-success light-font">Survival</button>
                                                            <button id="back" class="btn btn-success light-font">Exit</button>
                                                            </div>`;

    $("#back").on('click', () => {
        chooseGame();
    });

    if ($(window).innerWidth() < 768) {
        $("#casualMode").popover('show');
        $("#survivalMode").popover('show');
    }

    $("#casualMode").mouseenter(() => {
        $("#casualMode").popover('show');
    });
    $("#casualMode").mouseleave(() => {
        $("#casualMode").popover('hide');
    });
    $("#casualMode").on('click', () => {
        $("#casualMode").popover('hide');
        $("#survivalMode").popover('hide');
        if (gameType == "ThreeOfAKind") {
            currentGameSet = [...gameData];
            setThreeOfAKindBoard('casual');
        } else if (gameType == "RolePlay") {
            currentGameSet = [...mostPopular];
            setRolePlayBoard('casual')
        }
    });

    $("#survivalMode").mouseenter(() => {
        $("#survivalMode").popover('show');
    });
    $("#survivalMode").mouseleave(() => {
        $("#survivalMode").popover('hide');
    });
    $("#survivalMode").on('click', () => {
        $("#casualMode").popover('hide');
        $("#survivalMode").popover('hide');
        if (gameType == "ThreeOfAKind") {
            currentGameSet = [...gameData];
            setThreeOfAKindBoard('survival');
        } else if (gameType == "RolePlay") {
            currentGameSet = [...mostPopular];
            setRolePlayBoard('survival')
        }
    });
}

function showLeaderboard(index) {
    document.getElementById("gameWindow").innerHTML = `<div class="col-12 leaderboard-container">
    <div class="d-none d-md-block col-md-6 left-column trophy"><img src="Assets/Media/goldenglobesmall.png"></div>
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