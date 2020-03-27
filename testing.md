# MLLRB MovieBuff Game
## Tests Documentation
- [Styling Testing](#Styling-Testing)
- [Application Testing](#Application-Testing)
    - [Global Variables](#Global-Variables)
    - [Loading the game:](#Loading-the-game:)
    - [The Game](#The-Game)
        - [3 of a Kind Game, Casual Mode, Manual Tests](#3-of-a-Kind-Game,-Casual-Mode,-Manual-Tests)
        - [3 of a Kind Game, Survival Mode, Manual Tests](#3-of-a-Kind-Game,-Survival-Mode,-Manual-Tests)
        - [Role Play Game, Casual Mode, Manual Tests](#Role-Play-Game,-Casual-Mode,-Manual-Tests)
        - [Role Play Game, Survival Mode, Manual Tests](#Role-Play-Game,-Survival-Mode,-Manual-Tests)
        - [Manual Tests Conclusions](#Manual-Tests-Conclusions)
    - [Bugs encountered](#Bugs-encountered)

### Styling Testing

I used Google Chrome developer tools for the majority of the development process. 

I encountered a few bugs along the way particularly with the image sizes for the actors and movies displayed. During initial development I had been viewing the application in a 1024px x 722px and initially styling the game for those dimensions, however, as I began widening the screen I noticed that the images would grow but not significantly enough to take up enough of the screen. Similarly, when on smaller screen sizes the images would become too small. This was as a result of how they were being displayed via the HTML img tag as opposed to a background image of a div which in itself was a decision to get around the div sizes distorting the images and also as a result of the overall image aspect being governed by the width. To get around this I tried to make them bigger for at the smaller screen sizes by allowing the width to be 100%, however, because the height of the images is restricted, this would cause the image aspect ration to distort as I widened the screen. The only fix I could implement was by implementing various media breaks to govern the actor/movie image widths for differing screen size.

Implementing these media breaks also became useful for changing the font-size for the character names, game titles, headings and leaderboard. If left to the bootstrap grid system, these would overflow and overlap each other.

While testing the styling I also noticed that the trophy image for the leaderboard took up too much real estate on the smaller screen sizes so I decided not to display it on the smaller screen sizes which in turn allowed me to re-style the leaderboard screen for those smaller screen sizes.

A bug still exists when displaying some images. Most of the images share a consistent aspect ratio, however, there are some images that are slightly shorter in height. This comes directly from the data retrieved from the Movie DB and is apparent only becuase of my decision to display the images using the HTML img tag rather than setting the background-image and background-size of a div. I am yet to find a good solution to fixing this bug but I consider this an acceptable compromise in order to avoid the bugs I was encountering trying to dynamically set css properties of divs.

For desktop devices, I have tested the styling and responsivity on Google Chrome, Mozilla Firefox, Microsoft Edge and Opera browsers and am happy that the site's behaviour is consistent across them all. 

For mobile devices I have had to rely primarily on Chrome Developer Tools as I only have access to a Samsung Galaxy phone. I am also happy that the site displays well on mobile however there is a bug when switching back to portrait view from landscape. 
I have implemented a disclaimer encouraging the user to switch to landscape view on initial access to the site. If the user does switch to landscape, the game loads automatically and everything displays as intended. If at this point the user switches back to portrait view, the site doesn't fill the screen until a button is pressed (and therefore the html updated).
I would like to test this on Apple devices too unfortunately I don't have access at the moment and due to the Covid-19 restrictions currently in place, I can't borrow any from my peers.

### Application Testing
During development I have tested every aspect of the game and am happy that the game functions as intended.

#### Global Variables

I tested the following variables by logging to the console at various stages of game progress and observing the data.

* gameData[]
    * The gameData array contains a movieData object for every movie that meets the relevant requirements. 
    * The gameData array is constant for the duration of the game

* mostPopular[]
    * The mostPopular array contains only the movies from the gameData array that have a popularity greater than 10 and a release year after 1970

* movieData
    * Each movieData object requires that the movie is in English, has an original_title/title/name and is not an adult/pornographic film.
    * Each movieData object has an ID, title, release year, poster path and popularity.
    * Each movieData object also contains a "castMembers" array of actorData objects for each member of the cast.

* actorData
    * Each actorData has an ID, a name, a character name and a poster path


#### Loading the game: 

Being the part of the application that everything else is hinged on, I tested the loading sequence extensively during the development of the application by logging the results of each step to the console and examining the results manually making improvements where necessary. I also attempted to write some automated tests for the loading sequence.
These automated tests can be found in the Jasmine folder in the testLoadingTheGame.js file:

* Test Loading Sequence and Functions
    * Should reach the end of the loading sequence 
* Test fetchTopRatedMovies
    * Retrieves movie data from TMDB API
* Testing the gameData Array before cast has been added
    * Holds the relevant data retrieved from the TMDB API
* Test fetchMovieCast
    * Retrieves Cast Members for each instance of MovieData in GameData array
* Test populateCastMembers
    * Adds cast data to gameData.CastMembers Array for each movie
* Test data gained from the loading sequence
    * Results in gameData and mostPopular arrays for use within the game

All these tests passed.

I am, however, still unsure as to how relevant my tests are and indeed as to whether or not I conceptualised them correctly. The example tests covered in the coursework were for far less complex functionality and while I tried to conduct my own research, I ran out of time to pursue this further in the context of this project. 

#### The Game
I manually tested all aspects of the game using a combination of observed behaviour for the dynamically introduced HTML and logs to the console for data driven application behaviour.

##### 3 of a Kind Game, Casual Mode, Manual Tests
1.	Test: Clicked the “3 of a Kind” button
    * Expected Result: 
        - Game mode selection screen is displayed
        - The game title changes from “MovieBuff” to”3 of a Kind”.
    * Result: 
        - Game mode selection screen is displayed
        - The game title changes from “MovieBuff” to”3 of a Kind”.
2.	Test: Clicked the “Casual” button	
    * Expected Result: 
        - Game starts. 
        - Row of 3 actors above a row of three movies is displayed on the screen.
    * Result: 
        - Game starts. 
        - Row of 3 actors above a row of three movies is displayed on the screen.
3.	Test:  Click the correct answer (Actors: Harrison Ford + Karen Allen + Paul Freeman  Movie: Casablanca + Unforgiven + Indiana Jones and the raiders of the Lost Ark)
    * Expected Result: 
        - Border of correct result (Indiana Jones and the...) flashes green for about a second
        - next round is loaded
    * Result: 
        - Border of correct result (Indiana Jones and the...) flashes green for about a second
        - next round is loaded
4.	Test: Clicked the incorrect answer 
    * Expected Result: 
        - Border of clicked answer cycles red for about a second
        - next round is loaded
    * Result:  
        - Border of clicked answer cycles red for about a second
        - next round is loaded

- Repeat: Test 3 – success, 
- Repeat: Test 4 – success,
- Repeat: Test 3 – success, 
- Repeat: Test 4 – success,
- Repeat: Test 3 – success, 
- Repeat: Test 4 – success,
- Repeat: Test 4 – success,

5.	Test:  Clicked correct answer
    * Expected Results: 
        - Border of clicked answer flashes green for about a second, 
        - The current score and leader board is displayed, 
        - The player score is 5
        - Top Scores
            - 1st: 5
            - 2nd: 0
            - 3rd: 0        
    * Result: 
        - Border of clicked answer flashed green for about a second 
	    - The current score and leader board is displayed
	    - My score is 5
        - Top Scores
            - 1st: 5
            - 2nd: 0
            - 3rd: 0
6.	Test: Clicked Replay button
    * Expected Result: 3 of a Kind game starts again in Casual mode
    * Result: 3 of a Kind game started again in casual mode
7.	Test: Played through game once more getting 6 right and 4 wrong
    * Expected Result: 
        - Leader board is displayed
        - Player score is 6 
        - Top Scores
            - 1st: 6
            - 2nd: 5
            - 3rd: 0
    * Result: 
        - Leader board is displayed
        - Player score is 6 
        - Top Scores
            - 1st: 6
            - 2nd: 5
            - 3rd: 0
8.	Test: Played through game once more getting 4 right and 6 wrong
    * Expected Result:
        - Leader board is displayed
        - Player score is 4 
        - Top Scores
            - 1st: 6
            - 2nd: 5
            - 3rd: 4
    * Result:
        - Leader board is displayed
        - Player score is 4 
        - Top Scores
            - 1st: 6
            - 2nd: 5
            - 3rd: 4
9.	Test: Played through game once more getting 3 right and 7 wrong
    * Expected Result: 
        - Leader board is displayed 
        - Player score is 3 
        - Top Scores
            - 1st: 6
            - 2nd: 5
            - 3rd: 4 
		- Player score for this round is not in the top 3 scores
    * Result: 
        - Leader board is displayed
        - Player score is 3 
        - Top Scores
            - 1st: 6
            - 2nd: 5
            - 3rd: 4 
		- Player score for this round is not in the top 3 scores
10.	Test: Played through game once more getting 8 right and 2 wrong
    * Expected Result: 
        - Leader board is displayed
        - Player score is 8 
        - Top Scores
            - 1st: 8
            - 2nd: 6
            - 3rd: 5 
    * Result: 
        - Leader board is displayed
        - Player score is 8 
        - Top Scores
            - 1st: 8
            - 2nd: 6
            - 3rd: 5 
11.	Test: Played through game once more getting 7 right and 3 wrong
    * Expected Result: 
        - Leader board is displayed
        - Player score is 7 
        - Top Scores
            - 1st: 8
            - 2nd: 7
            - 3rd: 6
    * Result: 
        - Leader board is displayed
        - Player score is 7 
        - Top Scores
            - 1st: 8
            - 2nd: 7
            - 3rd: 6
12.	Test: Clicked the Home button
    * Expected Result: 
        - Game Type selection menu  is displayed
        - Title changes to “MovieBuff”
    * Result: 
        - Game Type selection menu  is displayed
        - Title changes to “MovieBuff”
13.	Test: Clicked 3 of a Kind, Selected Casual mode and played through getting no correct answers
    * Expected Result:
        - Leader board is displayed
        - Player score is 0 
        - Top Scores
            - 1st: 8
            - 2nd: 7
            - 3rd: 6
    * Result: 
        - Leader board is displayed
        - Player score is 0 
        - Top Scores
            - 1st: 8
            - 2nd: 7
            - 3rd: 6
        - Top Scores Leader board is persistent
14. Test: Started game, clicked 7 correct answers, clicked exit button, started new game, clicked 0 correct answers
    * Expected Result: 
        - Leaderboard remains unchanged
    * Result: 
        - Leaderboard remained unchanged

##### 3 of a Kind Game, Survival Mode, Manual Tests
1.	Test: Clicked 3 of a Kind button and then clicked Survival button.
    * Expected Result: 
        - Game starts 
        - See a row of 3 actors above a row of three movies on the screen.
    * Result: 
        - Game starts 
        - See a row of 3 actors above a row of three movies on the screen.
2.	Test: Clicked correct answer
    * Expected result: 
        - Border of answer clicked flashes green for about a second
        - New question is loaded
    * Result: 
        - Border of answer clicked flashes green for about a second
        - New question is loaded

- Repeat test 1, 5 more times getting the expected result each time.

3.	Test: Clicked incorrect answer
    * Expected result: 
        - Border of answer clicked cycles red for about a second
        - Leaderboard is displayed
		- Player score is 6.    
        - Top scores: 
            - 1st: 6
            - 2nd: 0
            - 3rd: 0
    * Result: 
        - Border of answer clicked cycles red for about a second
        - Leaderboard is displayed
		- Player score is 6.    
        - Top scores: 
            - 1st: 6
            - 2nd: 0
            - 3rd: 0
4.	Test: Clicked Replay
    * Expected Result: New 3 of a Kind game in Survival mode is loaded
    * Result: New 3 of a Kind game in Survival mode is loaded
5.	Test: Clicked 4 correct answers before one incorrect answer
    * Expected Result: 
        - Leaderboard screen is displayed
        - Player score is 4
        - Top scores: 
            - 1st: 6
            - 2nd: 4
            - 3rd: 0
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 4
        - Top scores: 
            - 1st: 6
            - 2nd: 4
            - 3rd: 0
- Repeated Test 4.
6.	Test: Clicked 5 correct answers before one incorrect answer
    * Expected Result:
        - Leaderboard screen is displayed
        - Player score is 5
        - Top scores: 
            - 1st: 6
            - 2nd: 5
            - 3rd: 4
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 5
        - Top scores: 
            - 1st: 6
            - 2nd: 5
            - 3rd: 4
7.	Test: Clicked the Home button
    * Expected Result: 
        - Game Type selection menu  is displayed
        - Title changes to “MovieBuff”
    * Result: 
        - Game Type selection menu  is displayed
        - Title changes to “MovieBuff”
8.	Test: Selected 3 of a kind – Casual Mode. Played through getting 0 correct answers
    * Expected Result: 
        - Leaderboard screen is displayed
        - Player score is 0
        - Top scores: 
            - 1st: 8
            - 2nd: 7
            - 3rd: 6
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 0
        - Top scores: 
            - 1st: 8
            - 2nd: 7
            - 3rd: 6
- (3 of a Kind Casual Mode leaderboard is persistent)
9.	Test: Clicked 3 of a Kind button and then clicked Survival button, played the game getting the first answer incorrect
    * Expected Result: 
        - Leaderboard screen is displayed
        - Player score is 0
        - Top scores: 
            - 1st: 6
            - 2nd: 5
            - 3rd: 4
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 0
        - Top scores: 
            - 1st: 6
            - 2nd: 5
            - 3rd: 4
- (3 of a Kind Survival Mode leaderboard is persistent)
10. Test: Started game, clicked 5 correct answers, clicked exit button, started new game, clicked 0 correct answers
    * Expected Result: 
        - Leaderboard remains unchanged
    * Result: 
        - Leaderboard remained unchanged

##### Role Play Game, Casual Mode, Manual Tests
1.	Test: Clicked the “Role Play” button
    * Expected Result: 
        - Mode selection screen displayed
        - The game title changes from “MovieBuff” to ”Role Play”
    * Result: 
        - Expected Result: 
        - Mode selection screen displayed
        - The game title changes from “MovieBuff” to ”Role Play”
2.	Test: Clicked the “Casual” button	
    * Expected Result: 
        - Game starts 
        - 3 character names are displayed above a row of three movies on the screen
    * Result: 
        - Game starts 
        - 3 character names are displayed above a row of three movies on the screen
3.	Test:  Click the correct answer 
    * Expected Result: 
        - Border of correct result flashes green for about a second
        - The next round is loaded
    * Result:
        - Border of correct result flashes green for about a second
        - The next round is loaded 
4.  Test: Click the incorrect answer 
    * Expected Result: 
        - Border of clicked answer cycles red for about a second
        - The next round is loaded
    * Result:
        - Border of clicked answer cycles red for about a second
        - The next round is loaded
- Repeat: Test 3 – success 
- Repeat: Test 3 – success
- Repeat: Test 3 – success 
- Repeat: Test 3 – success
- Repeat: Test 4 – success 
- Repeat: Test 4 – success
- Repeat: Test 4 – success

5.	Test:  Clicked correct answer
    * Expected Results: 
        - Border of clicked answer flashes green for about a second, 
        - The leaderboard is displayed, 
        - The player score is 6
        - Top Scores
            - 1st: 6
            - 2nd: 0
            - 3rd: 0        
    * Result: 
        - Border of clicked answer flashes green for about a second, 
        - The leaderboard is displayed, 
        - The player score is 6
        - Top Scores
            - 1st: 6
            - 2nd: 0
            - 3rd: 0
6.  Test: Clicked Replay button
    * Expected Result: Role Play game starts again in Casual mode
    * Result: Role Play game started again in casual mode
7.  Test: Played through game once more getting 2 right and 8 wrong
    * Expected Result:
        - Leader board is displayed
        - Player score is 2
        - Top Scores
            - 1st: 6
            - 2nd: 2
            - 3rd: 0
    * Result:
        - Leader board is displayed
        - Player score is 2 
        - Top Scores
            - 1st: 6
            - 2nd: 2
            - 3rd: 0
- Repeat test 6, success
8.  Test: Played through game once more getting 9 right and 1 wrong
    * Expected Result:
        - Leader board is displayed
        - Player score is 9
        - Top Scores
            - 1st: 9
            - 2nd: 6
            - 3rd: 2
    * Result:
        - Leader board is displayed
        - Player score is 9 
        - Top Scores
            - 1st: 9
            - 2nd: 6
            - 3rd: 2
- Repeat test 6, success
9. Test: Played through game once more getting 0 correct
    * Expected Result:
        - Leader board is displayed
        - Player score is 0
        - Top Scores
            - 1st: 9
            - 2nd: 6
            - 3rd: 2
    * Result:
        - Leader board is displayed
        - Player score is 0 
        - Top Scores
            - 1st: 9
            - 2nd: 6
            - 3rd: 2
10. Test: Started game, clicked 4 correct answers, clicked exit button, started new game, clicked 0 correct answers
    * Expected Result: 
        - Leaderboard remains unchanged
    * Result: 
        - Leaderboard remained unchanged

##### Role Play Game, Survival Mode, Manual Tests
1.	Test: Clicked Role Play button and then clicked Survival button.
    * Expected Result: 
        - Game starts 
        - 3 character names above a row of three movies is displayed on the screen
    * Result: 
        - Game starts 
        - 3 character names above a row of three movies is displayed on the screen
2.	Test: Clicked correct answer
    * Expected result: 
        - Border of answer clicked flashes green for about a second
        - New question is loaded
    * Result: 
        - Border of answer clicked flashes green for about a second
        - New question is loaded
3.	Test: Clicked incorrect answer
    * Expected result: 
        - Border of answer clicked cycles red for about a second
        - Leaderboard is displayed
		- Player score is 1    
        - Top scores: 
            - 1st: 1
            - 2nd: 0
            - 3rd: 0
    * Result: 
        - Border of answer clicked cycles red for about a second
        - Leaderboard is displayed
		- Player score is 1    
        - Top scores: 
            - 1st: 1
            - 2nd: 0
            - 3rd: 0
4.	Test: Clicked Replay
    * Expected Result: New Role Play game in Survival mode begins
    * Result: New 3 of a Kind game in Survival mode begins
5.	Test: Clicked 7 correct answers before one incorrect answer
    * Expected Result: 
        - Leaderboard screen is displayed
        - Player score is 7
        - Top scores: 
            - 1st: 7
            - 2nd: 1
            - 3rd: 0
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 7
        - Top scores: 
            - 1st: 7
            - 2nd: 1
            - 3rd: 0
- Repeated Test 4.
6.	Test: Clicked 3 correct answers before one incorrect answer
    * Expected Result:
        - Leaderboard screen is displayed
        - Player score is 3
        - Top scores: 
            - 1st: 7
            - 2nd: 3
            - 3rd: 1
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 3
        - Top scores: 
            - 1st: 7
            - 2nd: 3
            - 3rd: 1
- Repeated Test 4
7.  Test: Clicked 11 correct answers before one incorrect answer
    * Expected Result:
        - Leaderboard screen is displayed
        - Player score is 11
        - Top scores: 
            - 1st: 11
            - 2nd: 7
            - 3rd: 3
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 11
        - Top scores: 
            - 1st: 11
            - 2nd: 7
            - 3rd: 3
8.	Test: Clicked the Home button
    * Expected Result: 
        - Game Type selection menu is displayed
        - Title changes to “MovieBuff”
    * Result: 
        - Game Type selection menu is displayed
        - Title changes to “MovieBuff”
9.	Test: Selected 3 of a kind – Survival Mode getting 16 correct answers
    * Expected Result: 
        - Leaderboard screen is displayed
        - Player score is 16
        - Top scores: 
            - 1st: 16
            - 2nd: 6
            - 3rd: 5
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 16
        - Top scores: 
            - 1st: 16
            - 2nd: 6
            - 3rd: 5
- (3 of a Kind Casual Mode leaderboard is still persistent)
- repeated test 8
10.	Test: Clicked Role Play button and then clicked Survival button, played the game getting 6 correct answers before one incorrect answer
    * Expected Result: 
        - Leaderboard screen is displayed
        - Player score is 6
        - Top scores: 
            - 1st: 11
            - 2nd: 7
            - 3rd: 6
    * Result: 
        - Leaderboard screen is displayed
        - Player score is 6
        - Top scores: 
            - 1st: 11
            - 2nd: 7
            - 3rd: 6
- (Role Play Survival Mode leaderboard is persistent)
11. Test: Played each game through again getting a score of 0 each time
    * Expected Results: 
        - Player scores of 0 each time the leaderboard is displayed
        - Leaderboard top scores remain unchanged
    * Results:
        - Player scores were 0 each time the leaderboard was displayed
        - Leaderboard top scores did remain unchanged
14. Test: Started game, clicked 8 correct answers, clicked exit button, started new game, clicked 0 correct answers
    * Expected Result: 
        - Leaderboard remains unchanged
    * Result: 
        - Leaderboard remained unchanged


##### Manual Tests Conclusions
I am satisfied that:

* Choosing the 3 of a Kind game type only directs the player to the 3 of a Kind game.
* Choosing the Role Play game type only directs the player to the Role Play game.
* For both 3 of a Kind and Role Play game types...
    * Casual mode allows the player to play 10 rounds without penalty. That is, you can get 10 wrong or 10 correct answers - the mode always allows for 10 rounds.
    * Survival mode only allows for one incorrect answer
    * Survival mode allows for more than 10 rounds
    * the quit logo towards the top right exits the current game and doesn't save the score
* The leaderboard scores populate correctly - a higher score attains a higher rank on the leader board and a lower score attains a lower rank or no rank at all.
* The leaderboard scores are persistent for each game type/mode and there is no crossover/confusion of scores between game types/modes.
 
#### Bugs encountered

The first bug I attempted to fix was less a bug, more an artifact of the data. Some of the character names were displaying with "(voice)" after the character name which didn't look great but also indicated that the correct answer was an animated film. This is corrected by getCharacters() in the rolePlayMechanics.js file.

The next bugs I encountered and fixed were very similar to each other but concerned both game types. For the 3 of a kind game, when a movie was chosen that had less than three valid actors (actors with an image path assosciated) the game would crash or not display any actors. Similarly, if during the rolePlay game, the chosen movie had less than 3 valid characters (this is also dependant on the actors with a valid image path) the game would also crash.
To fix this I implemented a condition that would force a different movie to be chosen if the movie had less than 3 valid actors or characters depending on the relevant game type. I am reasonably certain my fix has worked but due to the chance nature of the movie selection and my current inability to automate the testing for this I can't be 100% sure.


### [Back To readme.md](readme.md)

