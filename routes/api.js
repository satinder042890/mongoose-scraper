// Require all models
var db = require("../models");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var results = [];

// Routes
module.exports=function(app){

app.get("/", function(req, res) {
    res.render("index");
});

// A GET route for scraping the Daily Universe website
app.get("/scrape", function(req, res) {
  var found;
  var titleArr = [];
    db.Article.find({})
      .then(function(dbArticle) {
        for (var j=0; j<dbArticle.length;j++) {
          titleArr.push(dbArticle[j].title)
        }
        console.log(titleArr);
    request("https://universe.byu.edu/", function(error, response, html) {
    if (!error && response.statusCode == 200) {
        // console.log(html);
      }
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html, {
      xml: {
        normalizeWhitespace: true,
      }
    })
    $("body h3").each(function(i, element) {
      // Save an empty result object
      var result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(element).children("a").text();
      found = titleArr.includes(result.title);
      result.link = $(element).children("a").attr("href");
      result.time = $(element).parent().children(".td-module-meta-info").find("time").text().trim();
      result.image=$(element).parent().parent().children(".td-module-thumb").find("img").attr("src");
      console.log(result.time);
      if (!found && result.title && result.link && result.image && result.time){
        results.push(result);
     }
    });
      res.render("scrape", {
      articles: results
    });
  })
});
});

// Route for getting all Articles from the db
app.get("/saved", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      console.log(dbArticle);
      res.render("saved", {
        saved: dbArticle
      });
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for creating an Article in the db
app.post("/api/saved", function(req, res) {
  // console.log("body="+req.body.title);
  // console.log("body="+req.body.link);
  // console.log("body="+req.body.time);
  // console.log("body="+req.body.image);
  db.Article.create(req.body)
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  console.log(req.params.id);
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      console.log(dbArticle);
      if (dbArticle) {
      res.render("articles", {
        data: dbArticle
      });
    }
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//Route for deleting an article from the db
app.delete("/saved/:id", function(req, res) {
  db.Article.deleteOne({ _id: req.params.id })
  .then(function(removed) {
    res.json(removed);
  }).catch(function(err,removed) {
      // If an error occurred, send it to the client
        res.json(err);
    });
});

//Route for deleting a note
app.delete("/articles/:id", function(req, res) {
  db.Note.deleteOne({ _id: req.params.id })
  .then(function(removed) {
    res.json(removed);
  }).catch(function(err,removed) {
      // If an error occurred, send it to the client
        res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { note: dbNote._id }}, { new: true })
      .then(function(dbArticle) {
        console.log(dbArticle);
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
    })
    .catch(function(err) {
      res.json(err);
    })
});
}