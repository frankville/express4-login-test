var express = require("express"); 
var passport = require("passport");
var connect = require("connect");
var bodyParser = require("body-parser");
//var multer = require("multer");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
var mysql = require("mysql");
var http = require("http");

var app = express();

function verifyAccount(account, callback){
	    db.query('SELECT id FROM webusers WHERE username = ? AND password = ?' , [account.username, account.password], callback);
}


passport.use(new LocalStrategy(
  function(username, password, done) {
    verifyAccount({ username: username, password: password }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      return done(null, user);
    });
  }
));



passport.serializeUser(function(user, done) {
	console.log(user);
  done(null, user);
});

passport.deserializeUser(function(id, done) {
 	done(err, id);
});

  app.use(express.static(__dirname) );
  app.use(cookieParser() );
  //app.use(multer());
  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressSession({
  	secret: "somethingcrazy",
  	resave: true,
  	saveUninitialized: true
  }));
  app.use(passport.initialize() );
  app.use(passport.session() );

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"1",
    database: "lancaster_test"
});

// Log any errors connected to the db
db.connect(function(err){
    if (err) console.log(err)
})




app.get('/',function(req,res,next){
	next();
});

app.get("/login",function(req,res,next){
	res.send("no valido! :/");
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }), function(req,res,next){
  }
);

server = http.createServer(app);
server.listen(2011, function () {
    console.log('server escuchando en http://devcloud.dnsdynamic.com:2011/');
});