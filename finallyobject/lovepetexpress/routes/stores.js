var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const client = require("ykt-http-client");
client.url("localhost:8080");

// 查询
router.get("/", async function (req, res, next) {
    let obj = req.query;
    //通过session查找门店
    obj.userId = req.session.storeuser._id
    let data = await client.get("/stores", obj);
    res.send(data);
})
// 获取所有服务与商品
router.get("/data", async function (req, res, next) {
    let storeServices = await client.get("/services",{userId: req.session.storeuser._id});
    let storeGoods = await client.get("/goods",{userId: req.session.storeuser._id});
    res.send({ storeServices, storeGoods });
})
// 获取门店关联的服务于商品，返回数据
router.get("/:id", async function (req, res, next) {
    let id = req.params.id;
    let data = await client.get("/stores/" + id);
    let { storeServiceIds, storeGoodsIds } = data
    let storeServices = [];
    let storeGoods = []
    for (let i = 0; i < storeServiceIds.length; i++) {
        let service = await client.get("/services/" + storeServiceIds[i], );
        storeServices.push(service);
    }
    for (let i = 0; i < storeGoodsIds.length; i++) {
        let goods = await client.get("/goods/" + storeGoodsIds[i], );
        storeGoods.push(goods);
    }
    let obj={ storeServices, storeGoods }
    res.send(obj);
})
// 删除
router.get("/removei", async function (req, res, next) {
    let { id } = req.query
    let data = await client.delete(`/stores/${id}`);
    res.send({ data });
})
// 增加
router.post("/", async function (req, res, next) {
    let obj = req.body
    obj.userId = req.session.storeuser._id
    obj.storeServiceIds = [];
    obj.storeGoodsIds = [];
    obj.shopEmployee = [{ empName: "店员1", empLevel: "普通员工", empPhone: "13812314824" }, { empName: "店员1", empLevel: "收银", empPhone: "13812314824" }, { empName: "店员1", empLevel: "技师", empPhone: "13812314824" }]
    let data = await client.post("/stores", obj);
    res.send({ data });
})
// 关联服务与商品
router.post("/addData", async function (req, res, next) {
    let obj = req.body
    let data = await client.get("/stores/" + obj.storeId);
    if (obj.name == "服务") {
        let { storeServiceIds } = data;
        for (let i = 0; i < obj.arr.length; i++) {
            storeServiceIds.push(obj.arr[i]._id)
        }
        let s = new Set([...storeServiceIds]);
        storeServiceIds = [...s]
        await client.put(`/stores/${obj.storeId}`, { storeServiceIds })
    } else {
        let { storeGoodsIds } = data;
        for (let i = 0; i < obj.arr.length; i++) {
            storeGoodsIds.push(obj.arr[i]._id)
        }
        let s = new Set([...storeGoodsIds]);
        storeGoodsIds = [...s]
        await client.put(`/stores/${obj.storeId}`, { storeGoodsIds })
    }
    res.send(data);
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