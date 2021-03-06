# RedditCards

By: **Foo Jiun Yang**

## 1. Project Objective

- To build an interactive website for users to search and view summarised Reddit Posts using Reddit API
- Users may search by recommended keywords, and filter search results accoding to relevance, upvotes (likes), or comments
- When a search is generated, users will see Reddit Posts reproduced in card containers, with summarised headings, images, subreddit categories, no. of upvotes, and no. of comments
- Users may visit the actual Reddit Posts via the Cards if they like through hyperlinks
- Live site: https://jyfoo213.github.io/RedditCards/
- Screenshot:
  ![Demo](assets/images/Demo.png)

## 2. Planning and Design

#### 2.1 Why Reddit API?

- Reddit API was chosen because of the richness of information from Reddit's database; users may search for topics from News, to Jokes, to Food, to Science, and Philosphy, etc
- This ensures that the website would appeal to a wide range of audience with varying interests
- The API allows unlimited search entries, and is also able to provide real-time, Live information from Reddit's database

#### 2.2 Theme, Design, UI/UX

![Search Bar](assets/images/SearchBar.png)

- The website features neutral colors, so users are able to focus their attention on the content generated from the Reddit Posts
- Website also features a clean user interface. There is only 1 search bar to prompt for input. And if users can't think of any inputs, a wide range of recommended search topics are available for users to explore to further enhance user experience
- Posts are generated in cards, which is able to display condensed information in a digestible manner, and is visually appealing in both desktop and mobile views
- The website is built on the bootstrap framework, which is reactive across any screen size

#### 2.3 Interactive Logics

- **Error message**: if there are no search inputs, an error message will be triggered to prompt users for an input. The error message will be dismissed when the user clicks elsewhere on the page
- **Collapsible "About" section**: The "About" section serves as a quick guide for users, and can be collapsed once the user has read its information, so the user can focus on the rest of the content the website has to offer
- **Responsive keywords and sort filters**: recommneded keywords are provided for users, which will generate a search result once clicked. The result will also appear in the search bar so users remember the keyword they have selected. Sort filters are also responsive, which generates the resultant search result upon clicking. These features allow a seamless UX for users when they are adjusting their search results
- **Image preview**: Images are loaded onto the cards from the Reddit API. If there are no images for preview, a [placeholder image](assets/images/reddit_placeholder_image.png) is shown instead. This ensures consistency in the card formatting and UI for users
- **String truncation**: As post titles or Urls loaded from the Reddit API can be lengthy, a string truncation function was used to shorten the display, to keep the UI clean and information relevant for users.

## 3. Implementation

#### 3.1 Technologies Used

- HTML5, CSS3, Bootstrap, Fontawesome
- Javascript, jQuery, Fetch API
- [Reddit API](https://www.reddit.com/dev/api/)

#### 3.2 Test Methdology

- Ensure user experience and display is consistent across multiple browsers and screen sizes
- Test all interactive features
- Platforms tested: PC (Chrome, Safari, Firefox), iPhone8 (Safari), and Google Pixel 4 (Chrome)
  ![Responsive](assets/images/Responsive.png)

#### 3.3 Testing Of All Interactive Features

- **Search Bar**: Enter any keyword into search bar, click enter or search icon and ensure that a return result is generated and appended into card containers
- **Error Message**: Enter a null response in the search bar, and ensure that an error message is triggered. Click anywhere on the screen to ensure error message is dismissed.
- **Recommended Keywords**: Click all recommneded keywords and ensure that the keyword is populated into the search bar, and the search is triggered automatically
- **Sort By Options**: Select all sorting options and ensure that the search is regenerated according to the value in the option
- **Collapsible About Section**: Click the "About" header section and ensure that the content can be collapsed / expanded
- **Search Results in Generated Cards**: Check search result generates (1) title, (2) image, (3) Url link of post, (4) subreddit category, (5) no. of upvotes, (6) no. of comments. Also ensure that 100 cards are generated per serach query.
- **External Links Generated in Cards**: Check that the card title, upvotes, comment button can be linked to the original Reddit post. Check that the Url link of the post can be accessed as well.
- **Responsiveness**: View website to ensure it was responsive across all screen sizes, displaying consistent user interface and experience

#### 3.4. Code Validation

- Code validation was checked with W3C Jigsaw Validator to ensure no errors
  ![Validator](assets/images/Validator.png)

#### 3.5. Deployment

- Project was built on Visual Studio Code and Visual Studio Code Live Server
- Project was committed, staged, and pushed to GitHub. 
- Specifically, a Github repository https://github.com/jyfoo213/RedditCards was created, before the master branch of the website is deployed and saved to the Github pages. 
- All  assets, i.e. images, javascript, css are in their respective folders, the main site named index.html and the README file in the root folder.

#### 3.6. Running My Code

- You may either use the fork function on github or clone/download button to duplicate the files in my master branch. For cloning, type git clone https://github.com/jyfoo213/RedditCards.git in your system's command prompt.
- You may use a code editor/IDE such as Visual Studio Code or Gitpod to open the folder and preview the website by running the code. 
- If you are viewing my website in an IDE offline, you may experience **CORS Issue.** Please see section below for more information.

#### 3.7 Potential CORS Issue & Troubleshooting

- **PLEASE NOTE** that if you are previewing my website in an IDE offline environment, you may encounter CORS issue. 
- There are 2 ways to resolve it:
  1. Install Live Server in your IDE. If you are using VS Code, you may install Live Server as an extension. Thereafter, preview my website in Live Server.
  2. View the website from my Github Live site directly: https://jyfoo213.github.io/RedditCards/
- **There will be no CORS issue as long as the website is viewed in LIVE environment based on the 2 options above provided**
- To understand more, CORS stands for Cross-Origin Resource Sharing. CORS is a security mechanism built into modern web-browsers. It basically blocks all the http requests from your front end to any API that is not in the same ???Origin??? (domain, protocol, and port???which is the case most of the time). 
- Hence to prevent this issue, it is **necessary to preview my website in Live environment**, so the http request to the API does not call from the same "Origin".  
- Explanation credits to this [website](https://blog.container-solutions.com/a-guide-to-solving-those-mystifying-cors-issues#:~:text=Simple%20as%20that.,allowed%20to%20do%20that%20call'.&text=In%20order%20to%20fix%20CORS,Access%2DControl%2DAllow%2D*), or to understand further, you may read this [Article](https://medium.com/netscape/hacking-it-out-when-cors-wont-let-you-be-great-35f6206cc646) or this [Reddit Thread](https://www.reddit.com/r/programming/comments/cby4vo/developers_dont_understand_cors/) as well.


## 4. Credits

- [Reddit API](https://www.reddit.com/dev/api/)
- [Integration of Reddit API with reference from TraversyMedia's Tutorial](https://www.traversymedia.com/)
- [Favicon credits](https://www.deviantart.com/sandiskplayer34/art/Reddit-App-Icon-537731823)
- [Placeholder image used loaded when API does not have preview image](assets/images/reddit_placeholder_image.png) - Image Credits to Reddit Official Site
- [Truncate function](https://stackoverflow.com/questions/1301512/truncate-a-string-straight-javascript)
- [Responsive Test](http://ami.responsivedesign.is/#)
