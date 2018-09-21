var express = require("express");
var router = express.Router();
const multiparty = require("multiparty");

const client = require("ykt-http-client");
client.url("localhost:8080");

// 新增
router.post("/", async function (req, res, next) {
  let body = req.body;
  body.userId = req.session.storeuser._id;
  await client.post("/services", body);
  res.send("success");
});

// 查询（后台）
router.get("/", async function (req, res, next) {
  let page = req.query.page;
  let rows = req.query.rows;
  let type = req.query.type;
  let text = req.query.text;
  let obj = {
    page,
    rows,
    userId: req.session.storeuser._id
  };
  if (type) {
    obj[type] = text;
  }
  let data = await client.get("/services", obj);
  res.send(data);
});

// 查询所有服务
router.get("/getAllServices", async function (req, res, next) {
  let data = await client.get("/services");
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
  await client.put("/services/" + id, body);
  res.send("success");
});

// 上传图片
router.post('/upload', function (req, res, next) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    } else {
      res.send(files.file[0].path.replace("public", "").replace(/\\/g, "/"));
    }
  });
});

module.exports = router;