const fs = require("fs");
const path = require("path");
const App = require("../application/application.js");

class Controller extends App {
    constructor () {
        super();

        // 初始化读取所有controller里的文件 加载并且储存
        const controllerFilePath = path.join(__dirname, "../../app/controller");
        const filesList = fs.readdirSync(controllerFilePath);
        filesList.forEach(item => {
            const filePath = path.join(__dirname, "../../app/controller", "./" + item);
            const filename = item.replace(/\.js$/, "");
            this[filename] = require(filePath);
        });
    }
}

module.exports = new Controller();
