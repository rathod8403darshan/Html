const errorhandle=(req,res)=>{

    return res
    .status(200)
    .json({ status: false, studentData: [], message: "can't get path"});

}
module.exports={errorhandle}