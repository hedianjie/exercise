'use strict';

// const Controller = require('../app.js').Controller;

// class HomeController extends Controller {
//   async index() {
//     this.ctx.body = 'hi, egg';
//   }
// }
module.exports = {
    async info() {
        this.ctx.response.end("hi, egg");
    }
};