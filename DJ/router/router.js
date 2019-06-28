const App = require("../application/application.js");

const detection = (url, controller) => {
    if (typeof url !== "string") throw new Error("Router: Incorrect data type detected, The [url] must be a string");
    if (typeof controller !== "function") throw new Error("Router: Incorrect data type detected, The [controller] must be a function");
    return true;
}

class Router extends App {
    constructor() {
        super();

        this.routerList = {
            GET: {},
            POST: {},
        }
        
    }

    get(url, controller) {
        detection(url, controller);
        this.routerList.GET[url] = controller;
    }

    post(url, controller) {
        detection(url, controller);
        this.routerList.POST[url] = controller;
    }

}

module.exports = new Router();