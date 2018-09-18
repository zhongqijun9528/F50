var express = require("express");
var router = express.Router();

const client = require("ykt-http-client");
client.url("localhost:8080");

// 新增
router.post("/", async function (req, res, next) {
  let body = req.body;
  body.userId = req.session.storeuser._id;
  await client.post("/services", body);
  res.send("success");
});

// 查询
router.get("/", async function (req, res, next) {
  let type = req.query.type;
  let text = req.query.text;
  let page = Number(req.query.page);
  let rows = Number(req.query.rows);
  let { storeId } = req.query
  let obj = {
    page,
    rows,
    userId: req.session.storeuser._id
  };
  if (storeId) {
    obj.storeId = storeId
  }
  if (type) {
    obj[type] = text;
  }
  let data = await client.get("/services", obj);
  res.send(data);
});

// 删除
router.delete("/:id", async function (req, res, next) {
  let ids = req.params.id.split(",");
  for (let item of ids) {
    await client.delete("/services/" + item);
  }
  res.send("success");
});

// 修改
router.put("/:id", async function (req, res, next) {
  let id = req.params.id;
  let body = req.body;
  if (id == "store") {
    let date = req.body.multipleSelection;
    let storeId = req.body.storeId
    for (let i = 0; i < date.length; i++) {
      let service = await client.get("/services/" + date[i]._id);
      storeId = storeId + ',' + service.storeId
      await client.put("/services/" + date[i]._id, { storeId });
    }
    res.send("success");
    return
  }
  let obj = {
    serviceName: body.serviceName,
    serviceType: body.serviceType,
    serviceSchedule: body.serviceSchedule,
    serviceCanFor: body.serviceCanFor,
    serviceDetial: body.serviceDetial,
    serviceTime: body.serviceTime,
    serviceLevel: body.serviceLevel,
    servicePrice: body.servicePrice
  };
  await client.put("/services/" + id, obj);
  res.send("success");
});

module.exports = router;