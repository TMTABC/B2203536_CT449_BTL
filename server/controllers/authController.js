const NhanVien = require("../models/NhanVien")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async(req,res)=>{
    const {HoTen,password,ChucVu,DiaChi,SoDienThoai,password_confirm,MSNV} = req.body;
    if(!HoTen||!password||!ChucVu||!SoDienThoai||!DiaChi||!password_confirm,!MSNV) return res.status(422).json({"message":"Invalid fields"})
    if(password!==password_confirm) return res.status(422).json({"message":"password don't match"})

    const nhanVienExists = await NhanVien.exists({MSNV}).exec();
    if(nhanVienExists) return res.status(409)

    try{
        hashedpassword = await bcrypt.hash(password,10)
        await NhanVien.create({MSNV,HoTen,password:hashedpassword,ChucVu,DiaChi,SoDienThoai});
        return res.status(201);
    }catch(e){
        return res.status(400).json({message:"Could not register"});
    }
}

const login = async(req,res)=>{
    const {MSNV,password} = req.body;
    if(!MSNV||!password) return res.status(422).json({"message":"Invalid fields"})
    const nhanVien = await NhanVien.findOne({MSNV}).exec(); 

    if(!nhanVien) return res.status(401)
    const match = await bcrypt.compare(password, nhanVien.password)
    if(!match) return res.status(401).json({message:"Email or password incorrect"})
    
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
    res.cookie('refresh_token',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});
    res.json({access_token:accessToken})
}

const logout = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies.refresh_token) return res.sendStatus(204)

    const refreshToken = cookies.refresh_token;
    const nhanVien = await NhanVien.findOne({refresh_token: refreshToken}).exec()
    if(!nhanVien) {
        res.clearCookie('referesh_token',{httpOnly:true})
        return res.sendStatus(204)
    }
    nhanVien.refresh_token = null;
    await nhanVien.save();
    res.clearCookie('referesh_token',{httpOnly:true})
    res.sendStatus(204)
}
const refresh = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies.refresh_token) return res.sendStatus(401);
    
    const refereshToken = cookies.refresh_token;

    const nhanVien = await NhanVien.findOne({refresh_token:refereshToken}).exec();

    if(!nhanVien) return res.sendStatus(403)

    jwt.verify(
        refereshToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err|| nhanVien.id !== decoded.id) return res.sendStatus(403)
            
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
    return res.status(200).json(user);
}

module.exports= {refresh,register,user,login,logout}