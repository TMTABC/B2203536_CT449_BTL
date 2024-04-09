const NhanVien = require("../models/NhanVien")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const registerUser=async(data)=>{
    const {HoTen,password,ChucVu,DiaChi,SoDienThoai,password_confirm,MSNV} = data;
    if(!HoTen||!password||!ChucVu||!SoDienThoai||!DiaChi||!password_confirm,!MSNV) return {erroCode:422,message:"Invalid fields"} 
    //res.status(422).json({"message":"Invalid fields"})
    if(password!==password_confirm) return {erroCode:422,message:"password don't match!!"}
    //res.status(422).json({"message":"password don't match"})
    
    const nhanVienExists = await NhanVien.exists({MSNV}).exec();
    if(nhanVienExists) return { erroCode: 409,message:"User is exists"}
    //res.sendStatus(409)
    try{
        hashedpassword = await bcrypt.hash(password,10)
        await NhanVien.create({MSNV,HoTen,password:hashedpassword,ChucVu,DiaChi,SoDienThoai});
        return {erroCode:201,message:"Create user success"}
        //res.sendStatus(201);
    }catch(e){
        return {erroCode:400,message:"Could not register"}
        //res.status(400).json({message:"Could not register"});
    }
}

const loginUser=async(data)=>{
    const {MSNV,password} = data;
    if(!MSNV||!password) return {erroCode:422,message:"Invalid fields"}
    //res.status(422).json({"message":"Invalid fields"})
    const nhanVien = await NhanVien.findOne({MSNV}).exec(); 

    if(!nhanVien) return {erroCode:401,message:"Not found user"}
    //res.status(401)
    const match = await bcrypt.compare(password, nhanVien.password)
    if(!match) return {erroCode:401,message:"Email or password incorrect"}
    //res.status(401).json({message:"Email or password incorrect"})
    
    const accessToken = jwt.sign(
        {
            id : nhanVien.id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'1800s'
        }
    )
    const refreshToken = jwt.sign(
        {
            id : nhanVien.id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'1800s'
        }
    )
    nhanVien.refresh_token = refreshToken;
    await nhanVien.save()
    //res.cookie('refresh_token',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});
    return {erroCode:200,access_token:accessToken}
}
const logoutUser=async(cookie)=>{
    const cookies = cookie;
    if(!cookies.refresh_token) return {erroCode:204,message:"user not login"}
    //res.sendStatus(204)

    const refreshToken = cookies.refresh_token;
    const nhanVien = await NhanVien.findOne({refresh_token: refreshToken}).exec()
    if(!nhanVien) {
        //res.clearCookie('referesh_token',{httpOnly:true})
        return {erroCode:204,message:"not found user"}
        //res.sendStatus(204)
    }
    nhanVien.refresh_token = null;
    await nhanVien.save();
    //res.clearCookie('referesh_token',{httpOnly:true})
    return {erroCode: 204,message:"logout success"}
    //res.sendStatus(204)
}

// const refreshUser=async(cookie)=>{
//     const cookies = cookie;
//     if(!cookies.refresh_token) return {erroCode:401,message:"user not login"}
//     //res.sendStatus(401);
//     console.log(cookies);
//     const refreshToken = cookies.refresh_token;

//     const nhanVien = await NhanVien.findOne({refresh_token:refreshToken}).exec();

//     if(!nhanVien) return {erroCode:403,message:"not found user"}
//     //res.sendStatus(403)
    
//     jwt.verify(
//         refreshToken,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err,decoded)=>{
//             if(err|| nhanVien.id !== decoded.id) return {erroCode:403,message:""}
//             //res.sendStatus(403)
//             console.log(decoded,nhanVien);
//             const accessToken = jwt.sign(
//                 {id:decoded.id},
//                 process.env.ACCESS_TOKEN_SECRET,
//                 {expiresIn:'1800s'}                
//             )
//             //res.json({access_token:accessToken})
//             return {erroCode:201,message:accessToken}
//         }
//     )
//     return {erroCode:201,message:"not refresh user"}
// }
const updateUserNV = async(id,payload)=>{
    const {HoTen,ChucVu,DiaChi,SoDienThoai} = payload;
    const nhanVien = await NhanVien.findOne({id}).exec();
    console.log(nhanVien);
    if(!nhanVien) return {erroCode:401,message:"not found user"}
    const resuilt = await NhanVien.findOneAndUpdate(id,{HoTen,ChucVu,DiaChi,SoDienThoai},{ returnDocument: "after" });
    return {erroCode:201,resuilt,message:'User was updated successfully'}
}
const deleteUserNV = async(msnv)=>{
    const nhanVien = await NhanVien.findOne({MSNV:msnv}).exec();
    if(!nhanVien) return {erroCode:401,message:"Not found user"}
    const resuilt = await NhanVien.findOneAndDelete({
        MSNV : msnv
    })
    return {erroCode : 200,resuilt,message: 'Delete user success'}
}
module.exports= {registerUser,loginUser,logoutUser,updateUserNV,deleteUserNV}