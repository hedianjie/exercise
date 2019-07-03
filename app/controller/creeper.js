const cheerio = require("cheerio");
const request = require("request");
const webSearchUrl = "http://11toon.com/bbs/search_stx.php?stx=";

const getSearch = async keyword => {
    return new Promise((reslove, reject) => {
        request(webSearchUrl + encodeURI(keyword), (err, res, body) => {
            reslove({
                body: body,
                err: err || res.statusCode != 200
            });
        });
    })
}

const getSearchData = $ => {
    const ary = [];
    $("#library-recents-list").find(".toons_item").each((index, item) => {
        ary.push({
            id: $(item).attr("data-id"),
            title: $(item).attr("data-title")
        })
    })
    return ary;
}

module.exports = {
    async search() {
        let result;
        const keyword = this.ctx.url.query.stx;
        const {body, err} = await getSearch(keyword);
        
        if(!err) {
            result = this.helper.format(getSearchData(cheerio.load(body)));
            this.ctx.response.end(result);
        }
        else {
            result = this.helper.format(null, 500, "没有可查询的漫画作品，请换一个关键字再试！");
            this.ctx.response.end(result);
        }
    }
}