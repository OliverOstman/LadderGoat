'use strict';
require('dotenv').config();
const express = require('express');
const db = require('./modules/database');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});

const https = require('https');
const http = require('http');
const fs = require('fs');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// enable cookies to send userID to client
app.use(cookieParser());

const connection = db.connect();

// login with passport
passport.serializeUser((user, done) => {
  console.log('serialize:', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// function to check if the user has logged in, to be used in middleware
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send('{"error": "Not logged in!"}');
  }
};

app.use(session({
  secret: 'keyboard LOL cat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false},
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('Here we go: ' + username);
      let res = null;

      const doLogin = (username, password) => {
        return new Promise((resolve, reject) => {
          db.login([username], connection, (result) => {
            console.log('pwd', result[0].password);
            bcrypt.compare(password, result[0].password, function(err, res) {
              // res == true
              console.log('res', res);
              console.log('err', err);
              if (res) {
                resolve(result);
              } else {
                reject(err);
              }
            });
          });
        });
      };

      return doLogin(username, password).then((result) => {
        if (result.length < 1) {
          console.log('undone');
          return done(null, false);
        } else {
          console.log('done');
          result[0].password = ''; // remove password from user's data
          return done(null, result[0]); // result[0] is user's data, accessible as req.user
        }
      }).catch((tst) => {
        console.log('tst', tst);
        console.log('kirjautumis virhe');
      });
    },
));

app.post('/login',
    passport.authenticate('local',
        {
          successRedirect: '/index.html',
          failureRedirect: '/Register.html',
        },
    ),
);

// authentication with custom callback (http://www.passportjs.org/docs/authenticate/)
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) { // if login not happening
      return res.redirect('/Register.html');
    }
    req.logIn(user, function(err) {
      // send userID as cookie:
      res.cookie('userID', req.user.uID);
      if (err) {
        return next(err);
      }
      return res.redirect('/index.html'); // if login succesful
    });
  })(req, res, next);
});

app.use('/register', (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log('hash', hash);
    db.register([req.body.username, hash], connection, () => {
      next();
    });
  });
});

app.post('/register', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) { // if login not happening
      return res.redirect('/Register.html');
    }
    req.logIn(user, function(err) {
      // send userID as cookie:
      res.cookie('userID', req.user.uID);
      if (err) {
        return next(err);
      }
      return res.redirect('/About.html'); // if login succesful
    });
  })(req, res, next);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('./index.html');
});

/*
app.get('/', (req, res) => {
  // check for https
  if (req.secure) {
    console.log('req.user', req.user);
    // if user is not logged
    if (req.user !== undefined) {
      res.redirect(301, 'front.html');
    } else {
      res.redirect(301, 'login.html');
    }
  } else {
    // if not https
    res.send('{"status": "not https"}');
  }
});
*/

// serve node_modules
app.use('/modules', express.static('node_modules'));

const cb = (result, res) => {
  console.log(result);
  res.send(result);
};

app.use(express.static('public'));

app.post('/');

/*
app.set('trust proxy');
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
}; */

// respond to post and save file
app.post('/upload', loggedIn, upload.single('mediafile'), (req, res, next) => {
  next();
});

// insert to database
app.use('/upload', (req, res, next) => {
  console.log('insert is here');
  console.log('user id: ' + req.user.uID);
  const data = [
    req.body.title,
    req.body.details,
    req.body.category,
    'uploads/' + req.file.filename,
    req.user.uID,
    req.file.mimetype,
  ];
  db.insert(data, connection, next);
});

// get updated data form database and send to client
app.use('/upload', (req, res) => {
  db.select(connection, cb, res);
});

app.get('/images', (req, res) => {
  db.select(connection, cb, res);
});

app.get('/search/:haku', (req, res) => {
  const haku = '%' + req.params.haku + '%';
  db.search(connection, [haku], (response) => {
    res.send(response);
  });
});

app.delete('/images/:mID', loggedIn, (req, res) => {
  const mID = [req.params.mID];
  db.del(mID, connection);
  res.send('{"status": "delete OK"}');
});

app.get('/username', (req, res) => {
  res.send(req.user);
  console.log(req.user);

});

//app.listen(8000);
app.listen(3000);