var express = require("express");
var router = express.Router();

const client = require("ykt-http-client");
client.url("localhost:8080");

// 新增
router.post("/", async function(req, res, next) {
  let body = req.body;
  console.log(body);
  await client.post("/services", body);
  res.send("success");
});

// 查询
router.get("/", async function(req, res, next) {
  let data = await client.get("/services");
  console.log(data);
  res.send(data);
});


module.exports = router;
