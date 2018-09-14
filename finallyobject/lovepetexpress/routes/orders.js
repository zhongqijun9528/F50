var express = require('express');
var router = express.Router();

/* GET home page. */
const client = require("ykt-http-client");
client.url('localhost:8080');
// 是否要引入
// const multiparty = require("multiparty");

// 查询
router.get('/', async function (req, res, next) {
    
    let data = await client.get(`/orders`);
    res.send(data)
});
// 删除
router.delete(`/:id`, async function (req, res, next) {
    let id = req.params.id;
    await client.delete(`/orders/` + id);
    res.send('success')
})
// 查询
router.get('/orders', async function (req, res, next) {
    // 会传入一个用户输入的数据进去
    let input=req.query.input;
    let data = await client.get(`/orders`, input);
    res.send(data)
});
module.exports = router;