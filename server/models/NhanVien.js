const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NhanVienSchema = Schema(
    {
        MSNV:{
            type    : String,
            require:true,
            index   : { unique: true }
        },
        HoTenNV:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true,
            min:6,
        },
        ChucVu:{
            type:String,
            require:true,
            min:6,
        },
        DiaChi:{
            type:String,
            require:true,
            min:6,
        },
        SoDienThoai:{
            type:String,
            require:true,
            min:6,
        },
        refresh_token:String
    },
    {
        virtuals:{
            id:{
                get(){
                    return this._id
                }
            }
        }
    }
)
module.exports = mongoose.model("NhanVien",NhanVienSchema)