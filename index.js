const express = require('express')
const path = require('path')
const hbs = require('hbs')
const PORT = process.env.PORT || 3000
var app = express();


app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


// mongoose.connect('mongodb://localhost/impulse');
mongoose.connect('mongodb://iosdmait:iosdmait@123@ds239648.mlab.com:39648/impulse18');
var db = mongoose.connection;

// //handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // var routes = require('./routes/router');
// // app.use('/', routes);


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
//   });
  
//   // error handler
//   // define as the last app.use callback
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send(err.message);
//   });

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/assets')));
// app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    // res.send('hello world');
});

// '/home/sidkathuria14/Desktop/desktop/Impulse18Website'


app.get('/users',function(req,res){
res.send('hello');
});



//blah blah blah blah

// var router = express.Router();
var User = require('./models/user');
var User2 = require('./models/user_ui');
var User3 = require('./models/user_workshop');
var User4 = require('./models/user_code');

// var path = require('path');
 //POST route for updating data

 app.post('/codebonanza', function (req, res, next) {
  // confirm that user typed same password twice
  console.log('/post')
  // if (req.body.password !== req.body.passwordConf) {
  //   var err = new Error('Passwords do not match.');
  //   err.status = 400;
  //   res.send("passwords dont match");
  //   return next(err);
  // }

  if (req.body.email &&
    req.body.name &&
    req.body.github &&
    req.body.mobile &&
    req.body.college 
   
  ) {

    var user4Data = {
      email: req.body.email,
      name: req.body.name,
      college:  req.body.college,
      github:   req.body.github,
      mobile:   req.body.mobile
       }

       var myData4 = new User2(req.body);
       myData4.save()
       .then(item => {
       res.send("item saved to database");
       })
       .catch(err => {
       res.status(400).send("unable to save to database");
       });
  }
   else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

app.post('/uiux', function (req, res, next) {
  // confirm that user typed same password twice
  console.log('/post')
  // if (req.body.password !== req.body.passwordConf) {
  //   var err = new Error('Passwords do not match.');
  //   err.status = 400;
  //   res.send("passwords dont match");
  //   return next(err);
  // }

  if (req.body.email &&
    req.body.name &&
    req.body.github &&
    req.body.mobile &&
    req.body.college 
   
  ) {

    var user2Data = {
      email: req.body.email,
      name: req.body.name,
      college:  req.body.college,
      github:   req.body.github,
      mobile:   req.body.mobile
       }

       var myData2 = new User2(req.body);
       myData2.save()
       .then(item => {
       res.send("item saved to database");
       })
       .catch(err => {
       res.status(400).send("unable to save to database");
       });
  }
   else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

 app.post('/workshop', function (req, res, next) {
  // confirm that user typed same password twice
  console.log('/post')
  // if (req.body.password !== req.body.passwordConf) {
  //   var err = new Error('Passwords do not match.');
  //   err.status = 400;
  //   res.send("passwords dont match");
  //   return next(err);
  // }

  if (req.body.email &&
    req.body.name &&
    req.body.github &&
    req.body.mobile &&
    req.body.college 
   
  ) {

    var user3Data = {
      email: req.body.email,
      name: req.body.name,
      college:  req.body.college,
      github:   req.body.github,
      mobile:   req.body.mobile
       }

       var myData3 = new User3(req.body);
       myData3.save()
       .then(item => {
       res.send("item saved to database");
       })
       .catch(err => {
       res.status(400).send("unable to save to database");
       });
  }
   else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});



 app.post('/maithacks', function (req, res, next) {
    // confirm that user typed same password twice
    console.log('/post')
    // if (req.body.password !== req.body.passwordConf) {
    //   var err = new Error('Passwords do not match.');
    //   err.status = 400;
    //   res.send("passwords dont match");
    //   return next(err);
    // }
  
    if (req.body.email &&
      req.body.name &&
      req.body.github &&
      req.body.mobile &&
      req.body.college 
      && req.body.teamname  
    ) {
  
      var userData = {
        email: req.body.email,
        name: req.body.name,
        college:  req.body.college,
        github:   req.body.github,
        mobile:   req.body.mobile,
        teamname: req.body.teamname
         }
      
           var myData = new User3(req.body);
           myData.save()
           .then(item => {
           res.send("item saved to database");
           })
           .catch(err => {
           res.status(400).send("unable to save to database");
           });
      }
       else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }


  });
  
  // GET route after registering
  app.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            var err = new Error('Not authorized! Go back!');
            err.status = 400;
            return next(err);
          } else {
            // return res.send('<h1>Name: </h1>' + user.name + '<h2>Mail: </h2>' + user.email + 
            // + '<h2>github: </h2>' + user.github 
            // + '<h2>college: </h2>' + user.college 
            // + '<h2>mobile: </h2>' + user.mobile 
            // + '<h2>team name: </h2>' + user.teamname +
            // '<br><a type="button" href="/logout">Logout</a>')
            return res.render('profile.hbs',{
              'name': user.name,
              'email': user.email,
              'github': user.github,
              'college': user.college,
              'mobile': user.mobile,
              'team': user.teamname
            })
          }
        }
      });
  });
  
//   // GET for logout logout
  app.get('/logout', function (req, res, next) {
      console.log('logout');
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });
  
// //   module.exports = router;
app.listen(3000);


