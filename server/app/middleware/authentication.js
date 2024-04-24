const jwt = require('jsonwebtoken')
const NhanVien = require('../models/NhanVien');
const ReaderService = require('../services/readerService');
const MongoDB = require('../utils/mongo');

function authentication(req,res,next){
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader?.startsWith('Bearer')){
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err,decoded)=>{
            if(err){
                req.user = {};
                return next();
            }
            const user = await NhanVien.findById(decoded.id).select({password: 0,refresh_token:0}).exec()
            if(user){
                req.user= user.toObject({getters:true});
            }else{
                req.user = {};
            }
            return next();
        })
    }else{
        req.user = {};
        return next();
    }
}

function authenticationReader(req,res,next){
    const readerHeader = req.headers.authorization || req.headers.Authorization;
    if(readerHeader?.startsWith('Bearer')){
        const token = readerHeader.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err,decoded)=>{
            if(err){
                req.reader = {};
                return next();
            }
            const readerService = new ReaderService(MongoDB.client)
            const reader = await readerService.findById(decoded.id).select({password: 0,refresh_token:0}).exec()
            if(reader){
                req.reader= reader.toObject({getters:true});
            }else{
                req.reader = {};
            }
            return next();
        })
    }else{
        req.reader = {};
        return next();
    }
}

module.exports = authentication;