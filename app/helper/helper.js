module.exports = {

    format (data, status=200, msg="操作成功") {
        return JSON.stringify({
            status,
            data,
            msg
        });
    }
}