const NhanVien = require("../models/NhanVien")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerUser, loginUser, logoutUser, updateUserNV, deleteUserNV } = require("../services/authService");
const ApiError = require("../error");

const register = async(req,res)=>{
    const document = await registerUser(req.body);
    console.log(document);
    return res.status(document.erroCode).json(document.message);
}

const login = async(req,res)=>{
    const document = await loginUser(req.body);
    res.cookie('refresh_token',document.access_token,{httpOnly:true,maxAge:24*60*60*1000});
    return res.status(document.erroCode).json(document);
}

const logout = async(req,res)=>{
    const document = await logoutUser(req.cookies);
    res.clearCookie('refresh_token',{httpOnly:true})
    console.log(document);
    return res.status(document.erroCode).json(document);
}
const refresh = async(req,res)=>{
    // const document = await refreshUser(req.cookies);
    // //console.log(document);
    // return res.status(200).json(document);
    const cookies = req.cookies;
    if(!cookies.refresh_token) return res.sendStatus(401);
    
    const refereshToken = cookies.refresh_token;

    const nhanVien = await NhanVien.findOne({refresh_token:refereshToken}).exec();

    if(!nhanVien) return res.sendStatus(403)

    jwt.verify(
        refereshToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err|| nhanVien.id !== decoded.id) return res.sendStatus(402)
            
            const accessToken = jwt.sign(
                {id:decoded.id},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'1800s'}                
            )
            res.json({access_token:accessToken})
        }
    )
}
const user = async(req,res)=>{
    const user = req.user;
    console.log(user)
    return res.status(200).json(user);
}
const updateUser = async(req,res,next)=>{
    try{
        console.log(req.params.id);
        const document = await updateUserNV(req.params.id,req.body)
        res.status(document.erroCode).json(document.message)
    }catch(err){
        return next(new ApiError(500,`Error update user with id = ${req.params.id}`))
    }
}

const deleteUser = async(req,res,next)=>{
    try{
        const document = await deleteUserNV(req.body.MSNV);
        res.status(document.erroCode).json(document.message)
    }catch(err){
        return next(new ApiError(500, `Error delete user with id = ${req.body}`))
    }
} 

module.exports= {refresh,register,user,login,logout,updateUser,deleteUser}