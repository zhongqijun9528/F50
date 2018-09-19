var express = require("express");
var router = express.Router();

const client = require("ykt-http-client");
client.url("localhost:8080");

// 查询
router.get("/", async function(req, res, next) {
  let type = req.query.type;
  let text = req.query.text;
  let page = Number(req.query.page);
  let rows = Number(req.query.rows);
  let obj = { page, rows };
  if(type){
    obj[type] = text;
  }
  let data = await client.get("/hosts", obj);

  res.send(data);
});
// 增加用户
router.post("/", async function (req, res, next) {
    let body = req.body;
    console.log(body)
   let data = await client.post("/hosts", {
    memberPhone: body.memberPhone,
    memberAcount: body.memberAcount,
    memberName: body.memberName,
    menberCard: body.menberCard,
    memberImg: body.memberImg,
    memberAdd: body.memberAdd,
    memberArea: body.memberArea,
    memberPoint: body.memberPoint,
    pets: body.pets,

    })
    res.send("data")
  })
//   删除用户
router.delete("/:id", async function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    await client.delete("/hosts/" + id);
    res.send({ status: "success" });
})

// 修改

  // 确认修改
  router.put("/:id", async function (req, res, next) {
    let body = req.body;
    let id = req.params.id;
    await client.put("/hosts/" + id, {
      memberPhone: body.memberPhone,
      memberAcount: body.memberAcount,
      memberName: body.memberName,
      menberCard: body.menberCard,
      memberImg: body.memberImg,
      memberAdd: body.memberAdd,
      memberArea: body.memberArea,
      memberPoint: body.memberPoint,
      pets: body.pest,
    })
    res.send("success")
  })
module.exports = router;