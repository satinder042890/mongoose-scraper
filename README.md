# Mongoose-Scraper
A web app that lets users view and leave comments on the latest news.
This full-stack application allows a client to scrape headlines, links, images, time from the Daily Universe website. The client can then save the articles in a database, delete saved articles, make notes on specific articles, and delete those notes.

![alt text](https://github.com/satinder042890/mongoose-scraper/blob/master/public/css/images/dailyuniverse.JPG)



## Scraping
The application uses "request" and "cheerio" for scraping the Daily Universe HTML. The articles scraped are compared to the ones in the database, and if the articles hasn't already been stored, it is put into an object which is rendered on the "/scrape" route with the help of the "express-handlebars" npm package. Both the scrape page and the Saved Articles page display links to the associated articles so that the user may check out the full articles before saving or writing a comment.

![alt text](https://github.com/satinder042890/mongoose-scraper/blob/master/public/css/images/scrape.png)


## Saved Articles
The articles are saved to the database with the help of the Mongoose NPM. According to their page, "Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment." This application uses Article and Note models with the Article model containing an array "note" that stores the ObjectIds of any associated Note. From the Saved Articles page, the client can delete an article from the database or navigate to the article's Note/Comment page in order to see any associated notes/comments or to make a comment. The data on all routes is redered with "express-handlebars".

![alt text](https://github.com/satinder042890/mongoose-scraper/blob/master/public/css/images/saved.png)


## Comment Section
The client can make a note or read a comment by navigating to the "/articles/_id" route where the user can read, delete, or create a comment/note.

![alt text](https://github.com/satinder042890/mongoose-scraper/blob/master/public/css/images/comment.png)


## Application Heroku Link
The link below will give you direct access to Mongoose Scraper web application using your web browser via the Heroku web service. (NOTE: There will be a momentary delay when first accessing the Heroku servers.)
https://appformongoose.herokuapp.com/

## Local Environment Setup
To use Mongoose Scraper web application application from your local environment, you must accomplish the following steps below:

##### Step 1 - Clone my repo using the command line below.

git clone https://github.com/satinder042890/mongoose-scraper.git
`

##### Step 2 - Change directory to the cloned repo folder.
`
cd mongoose-scraper
`
##### Step 3 - Install all required NPM packages.
`
npm install
`
##### Step 4 - Start the application server using the command line below
`
node server.js

## Technology used

* node.js
* heroku-cli 
* express
* Express-Handlebars 
* Body Parser
* Morgan
* Mongoose
* Request 
* Cheerio 
