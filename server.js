// Dependencies
// =============================================================
var express = require("express");

var path = require("path");

var fs = require('fs');

var db = require("./db/db.json");
var id = 1;

// let dbJSON = require("./db/db.json")

// var getNotes = require('./public/assets/js/index')



// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public/'));
//  (DATA)
// =============================================================


// Pages routes -----------------------------------

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/assets/css/styles.css", function(request, response) {
    response.sendFile(
        path.join(__dirname, "./public/assets/css/styles.css")
    );
});

// connecting the JS file 
app.get("/assets/js/index.js", function(request, response) {
    response.sendFile(path.join(__dirname, "./public/assets/js/index.js"));
});


// API routes -----------------------------
app.get("/api/notes", function(req, res) {
        res.json(db)
    })
    // API POST Requests

app.post("/api/notes", function(req, res) {
    req.body.id = id++;
    db.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {
        if (err) {
            console.log(err);
        }
    })
    res.json(db);
})

app.delete("/api/notes/:id", function(req, res) {
    var id = req.body.id
    var myObject = { id: id };
    db.splice(myObject, 1);
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {
        if (err) {
            console.log(err);
        }
    })
    res.json(db)
})

// app.get("/api/notes", function(req, res) {
//     fs.readFile("./db/db.json", function(err, notetext) {
//         if (err) throw err;
//         var notes = JSON.parse(notetext);
//         return res.json(notes);
//     })

// });


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
});