var express = require ('express');
var path = require ('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//wtf is going on ?
app.use((req, resp, next) => {
    resp.set('Access-Control-Allow-Origin', '*');
    next();
  });
  
  app.options('*', (req, resp, next) => {
    resp.set('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
    resp.set('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    resp.sendStatus(200);
  });

  const ApplicationContext={};

  const UserService = require('./services/users.service');

  ApplicationContext.services = {
      users: new UserService (app, ApplicationContext)
  }
  for(let key in ApplicationContext.services) {
    ApplicationContext.services[key].init();
  }
  // ApplicationContext.services[users].init();


  module.exports = app;