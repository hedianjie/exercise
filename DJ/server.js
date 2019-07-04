const router = require("./router/router.js");
const controller = require("./controller/controller.js");
const helper = require("../app/helper/helper.js");
require("../app/router.js")({router, controller})

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const {baseURL, port} = require("../config.js");
const Mime = require("./Mime.js");

const getMime = extname => {
    return Mime[extname] || "text/plain";
}

http.createServer((req, res) => {

    // 默认数据格式json utf8
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    
    // url
    const urlParse = url.parse(decodeURI(req.url), true);

    /*router.ctx.url = */controller.ctx.url = urlParse;

    // header
    /*router.ctx.headers = */controller.ctx.headers = req.headers;

    // request / response
    /*router.ctx.request = */controller.ctx.request = req;
    /*router.ctx.response = */controller.ctx.response = res;

    // methods
    const methods = req.method;
    /*router.ctx.request = */controller.ctx.method = methods;

    // helper
    /*router.helper = */controller.helper = helper;

    // 如果存在router 执行方法 this指向controller
    if(
        router.routerList[methods.toUpperCase()] && 
        typeof router.routerList[methods.toUpperCase()][urlParse.pathname] === "function"
    )
    {
        router.routerList[methods.toUpperCase()][urlParse.pathname].call(controller);
    }
    // 如果是静态页面
    else if (
        methods === "GET"
    )
    {
        if(urlParse.pathname.indexOf(".") === -1) {
            urlParse.pathname += "/index.html"
        }
        const staticURL = path.join(baseURL, urlParse.pathname);
        fs.readFile(staticURL, (err, result) => {
            if(err) {
                res.writeHead(404, {"Content-Type":"text/html;charset=UTF8"});
                res.end("404,页面没有找到");
            }
            else {
                const mime = getMime(path.extname(urlParse.pathname));
                res.writeHead(200, {"Content-Type": mime});
                res.end(result)
            }
        })

    }

}).listen(port);
