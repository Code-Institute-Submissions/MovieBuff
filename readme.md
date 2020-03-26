# MovieBuff 
##### A Game by MllrB

MovieBuff is a multiple choice game that offers various ways to test your movie knowledge:
 - Choose the movie that connects 3 actors
 - choose the movie that featured the characters displayed.

The game is powered by [the Movie DB](https://www.themoviedb.org/) and you can visit the live site via:
- [mllrb.com](http://mllrb.com/MovieBuff/index.html) 
- [GitHub pages](https://mllrb.github.io/MovieBuff/index.html)

_//This game was developed purely for personal educational purposes_

![alt text](http://mllrb.com/MovieBuff/Assets/Media/3GFW-readme.gif "Movie Buff Preview")

## Contents
- [UX](#UX)
    - [Project Goals](#Project-Goals)
    - [My Goals](#My-Goals)
    - [User Stories](#User-Stories)
    - [Design Choices](#Design-Choices)
    - [Fonts](#Fonts)
- [Wireframes](#Wireframes)
- [Technologies Used](#Technologies-Used)
    - [Languages](#Languages)
    - [Libraries/Tools](#Libraries/Tools)
    - [Applications](#Applications)
- [Testing and Bugs](#Testing-and-Bugs)
- [Deployment](#Deployment)
    - [GitHub Deployment](#GitHub-Deployment)
    - [Cloning my MovieBuff Repository](#Cloning-my-MovieBuff-Repository)
    - [Mllrb.com Deployment](#Mllrb.com-Deployment)
- [Acknowledgements](#Acknowledgements)

## UX

### Project Goals
I approached this project with a view to improving my knowledge of retrieving data from API's, manipulating this data and applying logic to present the data interactively. The suggestions for this project were to either build an interactive app that used data from an external API to present options to a user or to create a game (a memory game in particular). I didn't want to miss out on furthering my knowledge of API use but neither could I pass up the opportunity to try and make a game and so my goal for this project was to try and incorporate both in one application.

#### My Goals
- Use The Movie DB API to retrieve data 
- Structure the data retrieved for use within the game
- Develop the logical operations necessary for the game progression and also for the presentation of the data in an easy and intuitive manner.

#### User Stories
1. As a first time user I would like the game to be easy to access and understand
    * To satisfy this demand, I decided to present the game with a very simple menu. Both game types displayed first and then the 2 available modes on the next screen. 
    * On a desktop or laptop device, the user is shown the game rules via a Bootstrap popover/tooltip. For mobile devices this tooltip is displayed automatically. This is true for both game type and game mode buttons.

2. As a user I would like the game to have multiple ways to play
    * I decided to try to satisfy this by offering two game types...
        * 3 of a Kind: The player is presented with 3 actors and 3 movies. The objective of the game is to choose the movie that connects/starred the three actors.
        * Role Play: The player is presented with 3 movies and 3 character names. The objective of the game is to choose the movie that featured the 3 characters.
    * In addition to the two game types each game type also offers two modes...
        * Casual: The player plays 10 rounds and tries to achieve a 10/10 score.
        * Survival: The player has only one life. The game ends with the first incorrect answer and the aim is to score as high as possible.

3. As a user I would like varying degrees of difficulty
    * I would have liked to offer various difficulty levels via a selectable option, however, this would require much more data processing which would lead to a longer loading time and besides for which, difficulty in this game is quite subjective as each player's movie knowledge will differ. Also, in order to achieve that, my own movie knowledge would need to be significantly better than it is! Having played through the game numerous times while testing, I think a difficulty gradient is aachieved given that the Role Play game type is more difficult and requires greater movie knowledge than the 3 of a Kind game type, that said, in most cases the questions posed are not too difficult as the player can chose the correct answer by process of elimination. Initially the Role Play game difficulty was quite high so in order to reduce the difficulty I implemented a separate data set that omits movies below a certain popularity level and of those only includes the movies with a release date after 1970.

4. As a user I would like to shown my score at the end of each game and where that score ranks against previous attempts
    * A current score and leaderboard is displayed at the end of every round for each game type and mode.
    * The leaderboards are seperated by each game type and each mode within the game types.
    * The leaderboard scores are persistent but only per session. A page refresh will reset the top scores. Ideally I would prefer the scores to be persistent per user, however limitations in my knowledge of how to achieve this and time constraints have prevented me from implementing this for this current version.

5. As a user I would like to see variation in the questions posed
    * I tried to achieve this by shuffling the data set for each game attempt and each round within a game attempt. The player won't be presented with the same correct answer twice in the same round with one caveat... in survival mode and in the unlikely event that the player succeeds in answering all of the available questions correctly, the data set will reset.
    * If the same correct answers are displayed in subsequent game attempts, they at least won't be displayed in the same order and will have different preceding and succeeding questions.


#### Design Choices

In general, people watch movies in darkened environments whether that be in a theatre or at home. With that in mind I decided to use a dark background image and for the headings and titles to be slightly dimmed. This decision has the added bonus of directing the user's attention to the game rather than the background or titles.

In a nod to The Movie DB who provide the data that powers the game free of charge, I decided to use similar (but not the same) colors to their logo primary and secondary colors. I re-colored the background image with a dark blue overlay similar to that of their secondary logo color and the game buttons are styled with a similar color to their primary logo color. 

##### Fonts
My choice of fonts were made with the movie industry in mind.

* Titles: [Google Fonts: Monoton](https://fonts.google.com/specimen/Monoton)
    * This font reminded me of early cinema movie poster styles

* Buttons, tooltips and actor/character names: [Google Fonts: Special Elite](https://fonts.google.com/specimen/Special+Elite)
    * I chose this font for it's typewriter feel and it's similarity to Courier New which is traditionally used for movie/screenplay scripts 

* Leaderboard Scores: [Google Fonts: Bungee Inline](https://fonts.google.com/specimen/Bungee+Inline)
    * I feel that this font falls somewhere between the movie and game styles and is complimentary to the Monoton font used for the titles. For this reason I used it only for the leaderboard.

## Wireframes
I first scribbled out my basic idea on paper and then used Microsoft Powerpoint to produce a digital version. [View the pdf version](Assets/Media/moviebuff-wireframes.pdf)

The idea and design were always intended for a landscape viewing aspect and as such, rather than implementing a different design for mobile devices, I decided to implement a disclaimer prior to loading which encourages the user to switch to a landscape view and which would only display when the screen height is greater than it's width.

For the most part, I stuck to the wireframe design with the exception of the leaderboard screen. Initially my design would only show the players score at the end of each game, however, as development progressed I decided that it was necessary and desirable to also show the current top scores.

## Technologies Used

#### Languages
* HTML
* CSS
* Javascript

#### Libraries/Tools
* jQuery
* Bootstrap
* FontAwesome
* Google Fonts
* Git
* Jasmine

#### Applications
* Visual Studio Code
* GitHub
* Adobe Photoshop
* MS Powerpoint
* CPanel

## Testing and Bugs

View the testing documentation in the [testing.md file](testing.md)

## Deployment
This project has been deployed both on GitHub Pages and on my personal domain.

#### GitHub Deployment 
- [GitHub Pages Site](https://mllrb.github.io/MovieBuff/index.html)

First, I navigated to my [MovieBuff Repository](https://github.com/MllrB/MovieBuff) on the GitHub site.
The default tab selected is the Code tab so from here I selected the Settings tab. I scrolled down the page until I came to the "GitHub Pages" section from where I selected Master Branch as the source. I left the Theme Chooser empty. 

_Note: Although I own a custom domain, owing to the time constraints for the completion of this project and my current ignorance of the process, I decided against serving my custom domain from GitHub Pages. This is something I intend to rectify when time is not against me._

#### Cloning my MovieBuff Repository
Should you wish to clone this repository you can do so by:
1. Navigate to my [MovieBuff Repository](https://github.com/MllrB/MovieBuff)
2. Click the green "Clone or Download" button on the right side of the repository
3. Copy the URL displayed `(https://github.com/MllrB/MovieBuff.git)`
4. You will need to have Git installed on your system, if you don't you can find out how [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
5. Open a terminal window and navigate to the folder where you wish to clone this repository
6. Initialise Git for this folder by typing "git init"
7. Type "git clone " followed by the URL you copied on step 3. It should look like this: `git clone https://github.com/MllrB/MovieBuff.git`

#### Mllrb.com Deployment 
- [mllrb.com/MovieBuff](http://mllrb.com/MovieBuff/index.html) 
After purchasing the domain from letshost.ie I gained access to their cPanel via the services menu. From here I opened their file manager which allowed me to create the various folders associated with the site.

Folders: 
* MovieBuff
    * Assets
        * css
        * js
        * Media

Once I had created these folders I uploaded the various application files into their appropriate folders - all accomplished using the cPanel file manager application.

![alt text](Assets/Media/cPanel.png "File Manager example")

For simplicity and to avoid creating any unnecessary bugs, the folder names & structure and file names contained within each folder are identical to that of my GitHub repository with the exception of the Jasmine folder, jasmine test files and jasmine.html file which I deemed unnecessary for this avenue of deployment.

## Acknowledgements

* All data powering the game is provided by [the Movie DB](https://www.themoviedb.org/)
* The Movie DB logo also provided by [the Movie DB](https://www.themoviedb.org/)
* Actor and Movie images hosted by [the Movie DB](https://www.themoviedb.org/)
* GoldenGlobeAwards trophy image from [goldenglobes.com](https://www.goldenglobes.com/trophy-images) and unedited as stipulated (image resized to allow quick loading)
* Loading gif from [gifer.com](https://gifer.com/en/3GFW), edited by me to provide transparency
* Background image courtesy of [creativecommons.org](https://creativecommons.org/publicdomain/zero/1.0/deed.en) via [piqsels.com](https://www.piqsels.com/en/public-domain-photo-jtzfm). Edited by me.
* getRandomIntInclusive function code snippet from [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
* Array shuffling code snippet from [adamkhoury](http://www.developphp.com/video/JavaScript/Memory-Game-Programming-Tutorial)


------------
## Finally...
...I really hope you enjoyed the game :)






