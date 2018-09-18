var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const client = require("ykt-http-client");
client.url("localhost:8080");

// 查询
router.get("/", async function (req, res, next) {
    let obj = req.query;
    //通过session查找门店
    obj.userId=req.session.storeuser._id
    let data = await client.get("/stores", obj);
    res.send(data);
})
// 删除
router.get("/removei", async function (req, res, next) {
    let { id } = req.query
    let data = await client.delete(`/stores/${id}`);
    res.send({data});
})
// 增加
router.post("/", async function (req, res, next) {
    let obj = req.body
    obj.userId=req.session.storeuser._id
    obj.shopEmployee = [{ empName: "店员1", empLevel: "普通员工", empPhone: "13812314824" }, { empName: "店员1", empLevel: "收银", empPhone: "13812314824" }, { empName: "店员1", empLevel: "技师", empPhone: "13812314824" }]
    let data = await client.post("/stores", obj);
    res.send({ data });
})
// 修改
router.post("/elter", async function (req, res, next) {
    let obj = req.body
    let { shopName, shopAdd, shopImg, shopLocation, shopCorporate, shopTel, shopFeature } = obj
    let data = await client.put(`/stores/${obj._id}`, { shopName, shopAdd, shopImg, shopLocation, shopCorporate, shopTel, shopFeature });
    res.send({ data });
})
// 上传门店照片
router.post("/addImg", async function (req, res, next) {
    let form = new multiparty.Form({ uploadDir: './public/images' });
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err);
        } else {
            res.send({ shopImg: `http://localhost:3000/images/${files.file[0].path.replace("public", "").replace("images", "").replace(/\\/g, "")}` });
        }
    });
})

module.exports = router;