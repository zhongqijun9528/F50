var express = require('express');
var router = express.Router();

/* GET home page. */
const client = require("ykt-http-client");
client.url('localhost:8080');
// 是否要引入
// const multiparty = require("multiparty");

// 查询
router.get('/', async function (req, res, next) {
    let type = req.query.type;
    let text = req.query.text;
    let page = parseInt(req.query.page);
    let rows = parseInt(req.query.rows);
    let obj = { page, rows };
    if (type) {
        obj[type] = text;
    }
    let data = await client.get(`/orders`, obj);
    res.send(data)
});
// 删除
router.post(`/deleteData`, async function (req, res, next) {
    let id = req.body.id;
    console.log(id);
    let data2 = await client.delete(`/orders/` + id);
    let data = await client.get("/orders", { page: 1, rows: 5 });
    res.send(data)
})

module.exports = router;