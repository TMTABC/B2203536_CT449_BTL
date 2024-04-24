const ApiError = require("../error");
const ReaderService = require("../services/readerService");
const MongoDB = require("../utils/mongo");
const jwt = require("jsonwebtoken");

exports.create = async(req,res,next)=>{
    console.log(req.body);
    if(!req.body?.MaDocGia){
        return next(new ApiError(400,"Name can not be empty"));
    }
    try{
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.create(req.body);
        return res.send(document);
    }catch(err){
        console.log(err)
        return next(new ApiError(500,"A error occurred while creating the reader"));
    };
}
exports.user = async(req,res)=>{
    const user = req.user;
    console.log("asd")
    return res.status(200).json(user);
}

exports.findAll = async(req,res,next)=>{
    let documents = [];
    try{
        const readerService = new ReaderService(MongoDB.client);
        const {MaDocGia} =req.query;
        if(MaDocGia){
            documents = await readerService.findByName(MaDocGia);
        }else{
            documents = await readerService.find({});
        }
    }catch(err){
        return next(
            new ApiError(500,"A error occurred while retrieving the reader")
        )
    }
    return res.send(documents);
}

exports.findOne = async(req,res,next)=>{
    try{
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"reader no found"));
        }
        res.send(document);
    }catch(err){
        return next(
            new ApiError(500,`Error retrieving reader with id=${req.params.id}`)
        )
    }
}

exports.update = async(req,res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"nxb not found"));
        }
        res.send({message: "reader was updated successfully"});
    }catch(err){
        return next(new ApiError(500,`Error updating reader with id=${req.body.MaDocGia}`))
    };
}
exports.delete = async(req,res,next)=>{
    try{
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"reader not found"));
        }
        return res.send({message:"reader was deleted successfuly"});
    }catch(err){
        return next(new ApiError(500,`Could not delete reader with id=${req.params.id}`))
    }
}

exports.deleteAll = async(req,res,next)=>{
    try{
        const readerService = new ReaderService(MongoDB.client);
        const deletedCount = await readerService.deleteAll(); 
        console.log(deletedCount);
        res.send({
            message: `${deletedCount} reader were deleted successfully`,
        });
    }catch(err){
        return next(new ApiError(500,`An error occurred while removing all reader`))
    }
}

exports.login = async(req,res,next)=>{
    try{
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.loginReader(req.body);
            res.cookie('refresh_token',document.access_token,{httpOnly:true,maxAge:24*60*60*1000});
            return res.send(document);
    }catch(err){
        return next(new ApiError(500,`An error occurred while login reader with ${err}`))
    }
}
exports.logout = async(req,res,next)=>{
    try{

        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.logoutUser(req.cookies); 
        res.clearCookie('refresh_token',{httpOnly:true})
        console.log(document);
        return res.send(document);
    }
    catch(e){
        return next(new ApiError(500,`An error occurred while logout reader with ${err}`))
    }
}
exports.refresh=async(req,res,next)=>{
    try{
        const cookies = req.cookies;
        if(!cookies.refresh_token) return res.send("user not login")

        const refreshToken = cookies.refresh_token;
        const readerService = new ReaderService(MongoDB.client);
        const reader = await readerService.find({refresh_token: refreshToken});
        if(!reader) {
            res.send("not found reader")
        }
        jwt.verify(
            refreshToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err,decoded)=>{
                if(err|| reader.id !== decoded.id) res.status(402)
                
                const accessToken = jwt.sign(
                    {id:decoded.id},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'1800s'}                
                )
                res.status(200).json({access_token:accessToken})
            }
        )
    }
    catch(err){
        return next(new ApiError(500,`An error occurred while refresh reader with ${err}`))
    }
}