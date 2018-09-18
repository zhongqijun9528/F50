var express = require('express');
var router = express.Router();
const client = require('ykt-http-client');
const multiparty = require('multiparty');
client.url("127.0.0.1:8080");

// 渲染商品
router.post('/show', async function (req, res, next) {
    let page = parseInt(req.body.page);
    let rows = parseInt(req.body.rows);
    let obj = {
        page,
        rows,
        userId: req.session.storeuser._id
    };
    if (req.body.type) {
        obj.goodsName = req.body.type;
    }
    let data = await client.get('/goods', obj);
    res.send(data);
});

// 新增商品
router.post('/addGoods', async function (req, res, next) {
    let body = req.body;
    body.userId = req.session.storeuser._id;
    let data = await client.post('/goods', body);
    res.send(data)
});

// 移除商品
router.get('/delete', async function (req, res, next) {
    let data = await client.delete('/goods/' + req.query.id);
    res.send("success");
})


//确认修改
router.post('/updata', async function (req, res, next) {
    await client.put('/goods/' + req.body.id, req.body);
    res.send('success');
})

// 上传图片
router.post('/uploadAdd', function (req, res) {
    let form = new multiparty.Form({
        uploadDir: './public/upload'
    });
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err);
        } else {
            res.send(files.file[0].path.replace("public", "").replace(/\\/g, "/"));
        }
    });
})

module.exports = router;