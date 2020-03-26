# MLLRB MovieBuff Game
## Tests Documentation
- [Styling Testing](#Styling-Testing)
- [Application Testing](#Application-Testing)
    - [Global Variables](#Global-Variables)
    - [Loading the game:](#Loading-the-game:)
    - [The Game](#The-Game)
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

I am satisfied that:

* Choosing the 3 of a Kind game type only directs the player to the 3 of a Kind game.
* Choosing the Role Play game type only directs the player to the Role Play game.
* For both 3 of a Kind and Role Play game types...
    * Casual mode allows the player to play 10 rounds without penalty. That is, you can get 10 wrong or 10 correct - the mode always allows for 10 rounds.
    * Survival mode only allows for one incorrect answer
    * the quit logo towards the top right exits the current game and doesn't save the score
* The leaderboard scores populate correctly - a higher score attains a higher rank on the leader board and a lower score attains a lower rank or no rank at all.
* The leaderboard scores are persistent for each game type/mode and there is no crossover/confusion of scores between game types/modes.
 
#### Bugs encountered

The first bug I attempted to fix was less a bug, more an artifact of the data. Some of the character names were displaying with "(voice)" after the character name which didn't look great but also indicated that the correct answer was an animated film. This is corrected by getCharacters() in the rolePlayMechanics.js file.

The next bugs I encountered and fixed were very similar to each other but concerned both game types. For the 3 of a kind game, when a movie was chosen that had less than three valid actors (actors with an image path assosciated) the game would crash or not display any actors. Similarly, if during the rolePlay game, the chosen movie had less than 3 valid characters (this is also dependant on the actors with a valid image path) the game would also crash.
To fix this I implemented a condition that would force a different movie to be chosen if the movie had less than 3 valid actors or characters depending on the relevant game type. I am reasonably certain my fix has worked but due to the chance nature of the movie selection and my current inability to automate the testing for this I can't be 100% sure.


### [Back To readme.md](readme.md)

