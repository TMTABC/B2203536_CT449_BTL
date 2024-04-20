const ApiError = require("../error");
const FollowBookService = require("../services/followBookService");
const MongoDB = require("../utils/mongo");

exports.create = async(req,res,next)=>{
    console.log(req.body);
    if(!req.body?.MaSach){
        return next(new ApiError(400,"Name can not be empty"));
    }
    try{
        const followBookService = new FollowBookService(MongoDB.client);
        const document = await followBookService.create(req.body);
        return res.status(document.errCode).send(document);
    }catch(err){
        console.log(err)
        return next(new ApiError(500,"A error occurred while creating follow borrowing book"));
    };
}

exports.findAll = async(req,res,next)=>{
    let documents = [];
    try{
        const followBookService = new FollowBookService(MongoDB.client);
        const {name} =req.query;
        if(name){
            documents = await followBookService.findByName(name);
        }else{
            documents = await followBookService.find({});
        }
    }catch(err){
        return next(
            new ApiError(500,"A error occurred while retrieving follow book")
        )
    }
    return res.send(documents);
}

exports.findOne = async(req,res,next)=>{
    try{
        const followBookService = new FollowBookService(MongoDB.client);
        const document = await followBookService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"follow book no found"));
        }
        res.send(document);
    }catch(err){
        return next(
            new ApiError(500,`Error retrieving follow book with id=${req.params.id}`)
        )
    }
}

exports.update = async(req,res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const followBookService = new FollowBookService(MongoDB.client);
        const document = await followBookService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"book not found"));
        }
        res.send({message: "Follow borrowing book was updated successfully"});
    }catch(err){
        return next(new ApiError(500,`Error updating follow book with id=${req.body.MaSach}`))
    };
}

exports.delete = async(req,res,next)=>{
    try{
        const followBookService = new FollowBookService(MongoDB.client);
        const document = await followBookService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Follow book not found"));
        }
        return res.send({message:"Follow book was deleted successfuly"});
    }catch(err){
        return next(new ApiError(500,`Could not delete follow book with id=${req.params.id}`))
    }
}

exports.deleteAll = async(req,res,next)=>{
    try{
        const followBookService = new FollowBookService(MongoDB.client);
        const deletedCount = await followBookService.deleteAll(); 
        console.log(deletedCount);
        res.send({
            message: `${deletedCount} follow book were deleted successfully`,
        });
    }catch(err){
        return next(new ApiError(500,`An error occurred while removing all follow book`))
    }
}
exports.giveBookBack = async(req,res,next)=>{
    try{
        const followBookService = new FollowBookService(MongoDB.client);
        const document = await followBookService.giveBook(req.params.id);
        if(!document){
            return next(new ApiError(404,"book not found"));
        }
        return res.status(document.errCode).send(document.message);
    }catch(err){
        return next(new ApiError(500,`Error give book back with id=${req.params.id}`))
    };
} 
