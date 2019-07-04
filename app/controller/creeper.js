const cheerio = require("cheerio");
const request = require("request");
const url = require("url");

const getSearch = keyword => {
    return new Promise((resolve, reject) => {
    // "http://11toon.com/bbs/search_stx.php?stx="; 获取搜索结果地址
        request("http://11toon.com/bbs/search_stx.php?stx=" + encodeURI(keyword), (err, res, body) => {
            resolve({
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

const getPageList = async (id, keyword) => {
    // http://11toon.com/bbs/board.php?bo_table=toons&stx=&is=; 漫画集数
    let page = 1;
    const list = [];
    const get = p => {
        return new Promise((resolve, reject) => {
            console.log(`START get page list form ==> http://11toon.com/bbs/board.php?bo_table=toons&stx=${encodeURI(keyword)}&is=${id}&sord=&type=&page=${page}`);
            request(`http://11toon.com/bbs/board.php?bo_table=toons&stx=${encodeURI(keyword)}&is=${id}&sord=&type=&page=${p}`, (err, res, body) => {
                resolve({
                    body: body,
                    err: err || res.statusCode != 200
                });
            });
        })
    };

    while (true) {
        
        const {body, err} = await get(page);
        const $ = cheerio.load(body);
        const $children = $("#comic-episode-list").children();
        if(err || !$children.length) {
            console.log("--------------------- END of page list -----------------------");
            return {list, page};
        }
        else {
            page++;
            $children.each((index, item)=>{
                const opt = url.parse($(item).find("button.episode").attr("onclick"), true).query;
                list.push({
                    id,
                    keyword,
                    wr_id: opt.wr_id,
                    bo_table: opt.bo_table,
                    name: $(item).find(".episode-title").text(),
                    time: $(item).find(".free-date").html(),
                });
            });
        }
    }
}


const getContent = async (wr_id, bo_table, stx, id) => {
    // http://11toon.com/bbs/board.php?bo_table=&wr_id=&stx=&is=; 漫画图片地址集合
    console.log(`START search Picture form ==> http://11toon.com/bbs/board.php?bo_table=${bo_table}&wr_id=${wr_id}&stx${stx}=&is=${id}`)
    const {err, body} = await new Promise((resolve, reject) => {
        request(`http://11toon.com/bbs/board.php?bo_table=${bo_table}&wr_id=${wr_id}&stx${stx}=&is=${id}`, (err, res, body) => {
            resolve({
                body: body,
                err: err || res.statusCode != 200
            });
        })
    });

    const reg = /var img_list ?= ?(\[?(("|')https:\/\/([/0-9a-z.])+\.jpg("|'),? ?)+\]);/;

    console.log("--------------------- END of search picture -----------------------");
    if(err || !reg.test(body)) {
        return []
    }
    else {
        return eval(reg.exec(body)[1]);
    }
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
    },

    async pageList() {
        const {id, stx} = this.ctx.url.query;
        const ary = await getPageList(id, stx);
        const result = this.helper.format(ary);
        this.ctx.response.end(result)        
    },

    async content() {
        const {wr_id, bo_table, stx, id} = this.ctx.url.query;
        const ary =await getContent(wr_id, bo_table, stx, id);
        const result = this.helper.format(ary);
        this.ctx.response.end(result)
    }
}