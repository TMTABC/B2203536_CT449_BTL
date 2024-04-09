const ApiError = require("../error");
const ReaderService = require("../services/readerService");
const MongoDB = require("../utils/mongo");

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

exports.findAll = async(req,res,next)=>{
    let documents = [];
    try{
        const readerService = new ReaderService(MongoDB.client);
        const {MaDocGia} =req.query;
        console.log(MaDocGia);
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
