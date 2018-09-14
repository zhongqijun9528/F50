var express = require('express');
var router = express.Router();


const client=require("ykt-http-client");
client.url("localhost:8080");

router.get("/",async function(req, res, next){
  let data=await client.get("/users");
  res.send(data);
})

module.exports = router;
