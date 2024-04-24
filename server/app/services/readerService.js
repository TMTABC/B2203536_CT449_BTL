const {ObjectId} = require("mongodb");
const jwt = require("jsonwebtoken");
class ReaderService{
    constructor(client){
        this.Reader = client.db().collection("reader");
    }
    extractReaderData(payload){
       const reader = {
            MaDocGia:payload.MaDocGia,
            HoLot:payload.HoLot,
            Ten:payload.Ten,
            NgaySinh:payload.NgaySinh,
            Phai:payload.Phai,
            DiaChi:payload.DiaChi,
            DienThoai:payload.DienThoai,
            refresh_token:String,
            id:this._id
       };
       Object.keys(reader).forEach(
           (key)=>reader[key] === undefined && delete reader[key],
       );
       return reader;
    }
    async create(payload){
        const reader = this.extractReaderData(payload);
        const result = await this.Reader.findOneAndUpdate(
            reader,
            {$set:{publish : reader.publish === true}},
            {returnDocument:"after",upsert:true}
        )
        return {errCode:201,result,message:"Create reader success"};
    }
    async find(filter) {
        const cursor = await this.Reader.find(filter);
            return await cursor.toArray();
        }
    async findByName(MaDocGia) {
        return await this.find({
           MaDocGia: { $regex: new RegExp(MaDocGia), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Reader.findOne({
           _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractReaderData(payload);
        const result = await this.Reader.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
    async delete(id) {
        const result = await this.Reader.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async deleteAll() {
        const result = await this.Reader.deleteMany({});
        return result.deletedCount;
    }
    async loginReader(data){
        const {MaDocGia,password} = data
        if(!MaDocGia||!password) return {erroCode:422,message:"Invalid fields"}
        const reader = await this.findByName(MaDocGia);
        if(!reader) return {erroCode:404,message:"Not found user"}
        if(MaDocGia==password){
            
            const accessToken = jwt.sign(
                {
                    _id : reader[0]._id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn:'1800s'
                }
                )
                const refreshToken = jwt.sign(
                    {
                        _id : reader[0]._id
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn:'1800s'
                    }
                )
                const update={refresh_token : refreshToken}
                // await reader.save()
                const resuilt = await this.Reader.findOneAndUpdate(
                    {MaDocGia:data.MaDocGia},
                    { $set: update },
                    { returnDocument: "after" }
                    );
            return {erroCode:200,access_token:accessToken,data:resuilt,message:"login success"}
        }else {return {errCode:200,message:"Ma doc gia or password inconect"}}
    }
    async logoutUser(cookie){
        const cookies = cookie;
        if(!cookies.refresh_token) return {erroCode:400,message:"user not login"}
        //res.sendStatus(204)
    
        const refreshToken = cookies.refresh_token;
        const reader = await this.find({refresh_token: refreshToken});
        console.log("cehck",reader)
        if(!reader) {
            return {erroCode:404,message:"not found reader"}
        }
        const update={refresh_token : null}
                const resuilt = await this.Reader.findOneAndUpdate(
                    {MaDocGia:reader.MaDocGia},
                    { $set: update },
                    { returnDocument: "after" }
                    );
        return {erroCode: 200,message:"logout success"}
    }
}

module.exports = ReaderService;