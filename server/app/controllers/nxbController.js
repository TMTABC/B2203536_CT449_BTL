const ApiError = require("../error");
const NXBService = require("../services/nxbService");
const MongoDB = require("../utils/mongo");

exports.create = async(req,res,next)=>{
    console.log(req.body);
    if(!req.body?.nameNXB){
        return next(new ApiError(400,"Name can not be empty"));
    }
    try{
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.create(req.body);
        return res.send(document);
    }catch(err){
        console.log(err)
        return next(new ApiError(500,"A error occurred while creating the nha xuat ban"));
    };
}

exports.findAll = async(req,res,next)=>{
    let documents = [];
    try{
        const nxbService = new NXBService(MongoDB.client);
        const {name} =req.query;
        if(name){
            documents = await nxbService.findByName(name);
        }else{
            documents = await nxbService.find({});
        }
    }catch(err){
        return next(
            new ApiError(500,"A error occurred while retrieving the nha xuat ban")
        )
    }
    return res.send(documents);
}

exports.findOne = async(req,res,next)=>{
    try{
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"nxb no found"));
        }
        res.send(document);
    }catch(err){
        return next(
            new ApiError(500,`Error retrieving nxb with id=${req.params.id}`)
        )
    }
}

exports.update = async(req,res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"nxb not found"));
        }
        res.send({message: "nxb was updated successfully"});
    }catch(err){
        return next(new ApiError(500,`Error updating nxb with id=${req.params.id}`))
    };
}

exports.delete = async(req,res,next)=>{
    try{
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"nxb not found"));
        }
        return res.send({message:"nxb was deleted successfuly"});
    }catch(err){
        return next(new ApiError(500,`Could not delete nxb with id=${req.params.id}`))
    }
}

exports.deleteAll = async(req,res,next)=>{
    try{
        const nxbService = new NXBService(MongoDB.client);
        const deletedCount = await nxbService.deleteAll(); 
        console.log(deletedCount);
        res.send({
            message: `${deletedCount} nha xuat ban were deleted successfully`,
        });
    }catch(err){
        return next(new ApiError(500,`An error occurred while removing all nha xuat ban`))
    }
}

//Find all favorite contacts of a user
exports.findAllFavorite = async(req,res,next)=>{
    try{
        const nxbService = new NXBService(MongoDB.client);
        const documents = await nxbService.findFavorite(); 
        res.send(documents);
    }catch(err){
        return next(new ApiError(500,`An error occurred while retrieving favorite nha xuat ban`))
    }
}