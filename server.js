// Dependencies
// =============================================================
var express = require("express");

var path = require("path");

var fs = require('fs');

// let dbJSON = require("./db/db.json")

// var getNotes = require('./public/assets/js/index')



// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
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
    fs.readFile("./db/db.json", function(err, notetext) {
        if (err) throw err;
        var notes = JSON.parse(notetext);
        res.json(notes);
    })

});
// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// var Rfile = new Promise(function() {
//     fs.readFile("./db/db.json", function(err, notetext) {
//         if (err) throw err;
//         return notes = JSON.parse(notetext);
//     })
// })

app.post("/api/notes", function(req, res) {
    // console.log("the active note is: " + req.body)
    // Rfile.then(function(notes) {

    fs.readFile("./db/db.json", function(err, notetext) {
        if (err) throw err;
        var prevNotes = JSON.parse([notetext])
        var incomingNote = req.body;
        console.log(prevNotes)
        console.log([req.body]);

        prevNotes.push(incomingNote)
            // JSON.stringify(prevNotes)
        fs.writeFile("./db/db.json", prevNotes, function(err) {
            if (err) throw err;
            res.json(prevNotes);
            // })
        })
    })


});

//Delete Items


app.delete("/api/notes/:note", function(req, res) {
    // let newDbJSON = [];
    // const thisNoteID = req.params.note;
    // dbJSON.map(note => {
    //     if (note.id !==notetext thisNoteID) {
    //         newDbJSON.push(note);
    //     }
    // });

    // dbJSON = newDbJSON;

    res.end();
});


app.get("/api/notes", function(req, res) {
    console.log('there seems to be a problem' + res.json() + "---" + req)
    fs.readFile("./db/db.json", function(err, notetext) {
        if (err) throw err;
        var notes = JSON.parse(notetext);
        return res.json(notes);
    })

});

// app.post("/api/notes", function(req, res) {
//     fs.writeFile("./db/db.json", function(err, notetext) {
//         if (err) throw err;
//         var notes = JSON.stringify(notetext);
//         notes.push(req.body);
//         res.json(notes);
//     })


// });

// app.delete("/api/notes/:id", function(req, res) {
//     let newDbJSON = [];
//     const thisNoteID = req.params.id;
//     dbJSON.map(note => {
//         if (note.id !== thisNoteID) {
//             newDbJSON.push(note);
//             fs.writeFile("./db.json", function(err, notetext) {
//                 var notes = JSON.stringify(notetext);
//                 return res.json(notes);
//             })
//         }
//     });

//     // dbJSON = newDbJSON;

//     res.end();
// });


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
});