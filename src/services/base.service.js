const express = require('express');

module.exports = class BaseService {

  constructor(app, ctx, prefix) {    
    this.prefix = prefix;
    this.app = app;
    this.ctx = ctx;
    this.router = express.Router();
  }  

  init() {
    this.createRoutes(this.router);
    this.app.use(this.prefix, this.router);
    console.log(this.prefix, 'service ready');
  }

  createRoutes(router) {        
  }
//обертка для асинк функций, чтобы можно было использовать в rout
  wrap(fn) {
    return (req, resp, next) => {
      fn.bind(this)(req, resp, next)
      .then(() => {})
      .catch(err => {
        console.log(err);
        resp.status(500).send(err);
      });
    };
  }

};