describe("Test fetchTopRatedMovies", () => {
    it("Retrieves movie data from TMDB API", async() => {
        //arrange
        const pageNumber = 1;
        //act
        var movieDataReturned = await fetchTopRatedMovies(pageNumber);
        //expectations
        expect(movieDataReturned.total_pages).toBeGreaterThan(30);
        expect(movieDataReturned.results.length).toBeLessThanOrEqual(20);
    })
})

describe("Testing the gameData Array before cast has been added", () => {
    it("Holds the relevant data retrieved from the TMDB API", async() => {
        //arrange
        const pageNumber = 1;
        var movieDataReturned = await fetchTopRatedMovies(pageNumber);
        //act
        await populateGameData(movieDataReturned.results);
        //expectations
        expect(movieDataReturned).toBeInstanceOf(Object);
        expect(movieDataReturned.results).toBeInstanceOf(Array);
        expect(gameData.length).toBeGreaterThanOrEqual(1);

        gameData.forEach((item) => {
            expect(item).toBeInstanceOf(MovieData);
            expect(item.movieID).toBeInstanceOf(Number);
            expect(item.movieTitle).toBeInstanceOf(String);
            expect(item.moviePoster).toBeInstanceOf(String);
            expect(item.popularity).toBeInstanceOf(Number);
            expect(item.synopsis).toBeInstanceOf(String);
            expect(item.releaseYear).toBeInstanceOf(Number);
            expect(item.castMembers).toBeInstanceOf(Array);
        })
    })
})

describe("Test fetchMovieCast", () => {
    it("Retrieves Cast Members for each instance of MovieData in GameData array", async() => {
        //arrange
        var movieDataReturned = await fetchTopRatedMovies(1);
        await populateGameData(movieDataReturned.results);
        var movieToTest = gameData[0];
        //act
        var castReturned = await fetchMovieCast(movieToTest.movieID);
        //expectations
        expect(movieDataReturned.results).toBeInstanceOf(Array);
        expect(castReturned).toBeInstanceOf(Array);
        expect(castReturned.length).toBeGreaterThan(0);
    })
})

describe("Test populateCastMembers", () => {
    it("Adds cast data to gameData.CastMembers Array for each movie", async() => {
        //arrange
        var movieDataReturned = await fetchTopRatedMovies(1);
        await populateGameData(movieDataReturned.results);
        var movieToTest = gameData[0];
        var castReturned = await fetchMovieCast(movieToTest.movieID);
        //act
        populateCastMembers(movieToTest, castReturned);
        //expectations
        expect(gameData[0].castMembers).toBeInstanceOf(Array);
        expect(gameData[0].castMembers[0]).toBeInstanceOf(ActorData);
        expect(gameData[0].castMembers[0].actorID).toBeInstanceOf(Number);
        expect(gameData[0].castMembers[0].actorName).toBeInstanceOf(String);
        expect(gameData[0].castMembers[0].actorImage).toBeInstanceOf(String);
        expect(gameData[0].castMembers[0].characterName).toBeInstanceOf(String);
    })
})

describe("Test Loading sequence", () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; //loading takes loger than 5000ms

    beforeAll((done) => {
        loadGame();
        setTimeout(() => {
            done();
        }, 6000);

    });
    it("Results in gameData and mostPopular arrays for use within the game", () => {
        //arrange and Act

        //expectations
        expect(gameData.length).toBeGreaterThan(100);
        expect(mostPopular.length).toBeGreaterThan(100);
        expect(mostPopular[0].popularity).toBeGreaterThan(10);
        expect(mostPopular[96].popularity).toBeGreaterThan(10);
        expect(mostPopular[0].releaseYear).toBeGreaterThan(1970);
        expect(mostPopular[52].releaseYear).toBeGreaterThan(1970);

    })
})