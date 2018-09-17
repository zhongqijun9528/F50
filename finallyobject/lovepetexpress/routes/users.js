var express = require('express');
var router = express.Router();
var session=require("express-session");

const client=require("ykt-http-client");
client.url("localhost:8080");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/login",async function (req, res, next) {
    let query = req.query;
    let data=await client.get("/users",{userAcount:query.userAcount,userPwd:query.userPwd});
      if (data.length > 0) {
        req.session.user=data[0];
        res.send(data);
      }
})

router.get("/is_login",function(req,res,next){
    if(req.session.user){
      res.send({isuser:false,userAcount:req.session.user.userAcount});
    }else{
      res.send({isuser:true});
    }
  })

  router.get('/logout',function(req,res){
    delete req.session.user;
    res.send("success");
  });

router.get("/",async function(req, res, next){
    let query=req.query;
    let page=parseInt(query.page);
    let rows=parseInt(query.rows);
    let obj={page,rows};
    let data=await client.get("/users",obj); 
    res.send(data);
})
router.get("/serch",async function(req, res, next){
    let data=await client.get("/users"); 
    res.send(data);
})
//增加
router.post("/", async function (req, res, next) {
    let body = req.body;
    let data = await client.post("/users", {userAcount:body.userAcount,userPwd:body.userPwd,userPhone:body.userPhone,userMail:body.userMail,userName:body.userName,userType:body.userType,userStatus:body.userStatus})
    let data2=await client.get("/users",{page:1,rows:10})
    res.send(data2);

})
//删除
router.delete("/:id", async function (req, res, next) {
    let id = req.body.id;

    let data = await client.delete("/users/" + id);
    let data2=await client.get("/users",{page:1,rows:10})
    res.send(data2);
})
//修改
router.put("/:id", async function (req, res, next) {
    let body = req.body;
    let id = req.params.id;
    let data = await client.put("/users/" + id,{userAcount:body.userAcount,userPhone:body.userPhone,userMail:body.userMail,userName:body.userName,userType:body.userType,userStatus:body.userStatus})
    let data2=await client.get("/users",{page:1,rows:10})
    res.send(data2);
})
module.exports = router;
