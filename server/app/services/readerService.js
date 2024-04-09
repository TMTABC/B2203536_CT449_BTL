const {ObjectId} = require("mongodb");
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
            DienThoai:payload.DienThoai
       };
       Object.keys(reader).forEach(
           (key)=>reader[key] === undefined && delete reader[key]
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
    async findByName(name) {
        return await this.find({
           MaDocGia: { $regex: new RegExp(name), $options: "i" },
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
}
module.exports = ReaderService;