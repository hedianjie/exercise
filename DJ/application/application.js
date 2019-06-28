const EventEmitter = require("events").EventEmitter;

class Application extends EventEmitter {
    constructor() {
        super();
        this.ctx = {};
        this.app = {};
    }
}

module.exports = Application;