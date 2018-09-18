var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const client = require("ykt-http-client");
client.url("localhost:8080");


router.get("/", async function (req, res, next) {
    let obj = req.query
    let data = await client.get("/stores", obj);
    res.send(data);
})
router.get("/removei", async function (req, res, next) {
    let { id } = req.query
    let data = await client.delete(`/stores/${id}`);
    res.send(data);
})
router.post("/", async function (req, res, next) {
    let obj = req.body
    obj.shopEmployee = [{ empName: "店员1", empLevel: "普通员工", empPhone: "13812314824" }, { empName: "店员1", empLevel: "收银", empPhone: "13812314824" }, { empName: "店员1", empLevel: "技师", empPhone: "13812314824" }]
    let data = await client.post("/stores", obj);
    res.send({ data });
})
router.post("/elter", async function (req, res, next) {
    let obj = req.body
    let { shopName, shopAdd, shopImg, shopLocation, shopCorporate, shopTel, shopFeature } = obj
    let data = await client.put(`/stores/${obj._id}`, { shopName, shopAdd, shopImg, shopLocation, shopCorporate, shopTel, shopFeature });
    res.send({ data });
})
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