const ApiError = require("../error");
const BookService = require("../services/bookService");
const MongoDB = require("../utils/mongo");

exports.create = async(req,res,next)=>{
    if(!req.body?.MaSach){
        return next(new ApiError(400,"Name can not be empty"));
    }
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.status(document.errCode).send(document);
    }catch(err){
        console.log(err)
        return next(new ApiError(500,"A error occurred while creating book"));
    };
}

exports.findAll = async(req,res,next)=>{
    let documents = [];
    try{
        const bookService = new BookService(MongoDB.client);
        const {name} =req.query;
        if(name){
            documents = await bookService.findByName(name);
        }else{
            documents = await bookService.find({});
        }
    }catch(err){
        return next(
            new ApiError(500,"A error occurred while retrieving book")
        )
    }
    return res.send(documents);
}

exports.findOne = async(req,res,next)=>{
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"book no found"));
        }
        res.send(document);
    }catch(err){
        return next(
            new ApiError(500,`Error retrieving book with id=${req.params.id}`)
        )
    }
}

exports.update = async(req,res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"book not found"));
        }
        res.send({message: "book was updated successfully"});
    }catch(err){
        return next(new ApiError(500,`Error updating book with id=${req.body.MaSach}`))
    };
}

exports.delete = async(req,res,next)=>{
    try{
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"book not found"));
        }
        return res.send({message:"book was deleted successfuly"});
    }catch(err){
        return next(new ApiError(500,`Could not delete book with id=${req.params.id}`))
    }
}

exports.deleteAll = async(req,res,next)=>{
    try{
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll(); 
        console.log(deletedCount);
        res.send({
            message: `${deletedCount} book were deleted successfully`,
        });
    }catch(err){
        return next(new ApiError(500,`An error occurred while removing all book`))
    }
}
