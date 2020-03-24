describe("Shuffle an array", () => {
    it("Should return an array equal in length but ordered differently to the array passed in", () => {
        //arrange
        const arrayToPass = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var shuffledArray = [];
        var likeForLikeCount = 0;
        //act
        shuffledArray = shuffleArray(arrayToPass);

        shuffledArray.forEach((item, index) => {
            if (item[index] === arrayToPass[index]) {
                likeForLikeCount++;
            }
        })

        //expectations
        expect(shuffledArray.length === arrayToPass.length).toBe(true);
        expect(likeForLikeCount).toBeLessThan(shuffledArray.length);
    })
})

describe("Test setMovieRow", () => {

    it("should be passed a movie array of length 3 and return a shuffled array", () => {
        //arrange
        var movies = [{ movieID: 12445, moviePoster: "/fTplI1NCSuEDP4ITLcTps739fcC.jpg" },
            { movieID: 12445, moviePoster: "/fTplI1NCSuEDP4ITLcTps739fcC.jpg" },
            { movieID: 12445, moviePoster: "/fTplI1NCSuEDP4ITLcTps739fcC.jpg" }
        ];

        //act
        document.getElementById("gameWindow").innerHTML = `<span id="movies-row" style="position: absolute; display:flex; z-index:-1;"></span>`
        movies = setMovieRow(movies);
        //expectations
        expect(movies[0].movieID).toBeInstanceOf(Number);
        expect(movies[1].moviePoster).toBeInstanceOf(String);
        expect(movies.length).toBe(3);
    })
})