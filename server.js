const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT= 3000
const {logger} = require("./middleware/logEvents");
const errorHandler = require('./middleware/errorHandler');

//Use custom middleware
app.use(logger)


  const whitelist = ["https://facebook.com", ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        console.log("ERRRRRRR")
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

// Allow CORS
app.use(cors(corsOptions));


// Inbuilt middleware 
// To handle urlencoded data
// In other words: form data
app.use(express.urlencoded({extended: false}))

// Built in middleware for json
app.use(express.json());

// Serving static files
app.use(express.static(path.join(__dirname,"public")))
const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
  
};

app.use(myLogger);

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
  //res.send("Hello World!");
})
// Chaining route handlers
app.get('/', (req, res) => {
  // res.sendFile('./views/index.html',{root: __dirname})
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.send('Hello World!');

})

// Chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
}
const two = (req, res, next) => {
  console.log("two");
  next();
}
const three = (req, res) => {
  console.log("Last one");
  res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);

app.all("*", (req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'views', '404.html'));

})

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port 3000`);
});