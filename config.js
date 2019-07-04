const path = require("path");
module.exports = {
    mysql : {
        //host: "localhost",
        user: "root",
        password: "root",
        port: 3306,
        database: "exercise"
    },

    port: 8080,

    baseURL: path.join(__dirname, "./www"),
}