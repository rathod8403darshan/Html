const validation=require('./validation/studentValidation');
const validate=(schema)=> async(req,res,next)=>{
console.log(schema,"schema");
    if(!validation[schema]){
        throw new Error('validation not found!!!');
    }
    try {

        const validatevalue = await validation[schema].validateAsync(req.body);
        req.body=validatevalue;
        next();
        
    } catch (error) {
        return res
        .status(200)
        .json
        ;({
          status: false,
          studentData: [],
          message: error.message,
        });
    }

}
module.exports={
    validate
}