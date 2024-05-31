
var jwt = require('jsonwebtoken');
const authorize = (authority)=>(req,res,next)=>{

  let gettoken=req.headers.authorization;
  if(!gettoken){
    return res
    .status(200)
    .json({ status: false, studentData: [], message: "token not found" });

  }
  let token = req.headers.authorization.split(' ')[1];
try{
        decode=jwt.verify(token,'privatekey');
}
catch(error){
    return res
    .status(200)
    .json({ status: false, studentData: [], message: "internal server error" });
}
console.log(decode.roll);
console.log(authority);
if(!authority.includes(decode.roll)){
    return res
    .status(200)
    .json({ status: false, message: "unauthorized token" });

}
req.body={...req.body,email:decode?.email};
next()
}
module.exports=authorize