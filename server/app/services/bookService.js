const {ObjectId} = require("mongodb");
const NXBService = require("./nxbService");
const MongoDB = require("../utils/mongo");
class BookService{
    constructor(client){
        this.Book = client.db().collection("books");
    }
    extractBookData(payload){
       const book = {
            MaSach:payload.MaSach,
            TenSach:payload.TenSach,
            DonGia:payload.DonGia,
            SoQuyen:payload.SoQuyen,
            NamXuatBan:payload.NamXuatBan,
            MaNXB:payload.MaNXB,
            TacGia:payload.TacGia
       };
       Object.keys(book).forEach(
           (key)=>book[key] === undefined && delete book[key]
       );
       return book;
    }
    async create(payload){
        const book = this.extractBookData(payload);
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.findByName(payload.MaNXB);
        const bookExist = new BookService(MongoDB.client);
        const isExist = await bookExist.findByName(payload.MaSach);
        if(isExist) return {errCode:400,message:"ma sach is exist"}
        if(!document.length) return {errCode:404,message:"nxb is not exist"};
        else{
            const result = await this.Book.findOneAndUpdate(
            book,
            {$set:{publish : book.publish === true}},
            {returnDocument:"after",upsert:true}
        )
        return {errCode:200,result,message:"Create Book success"};}
    }
    async find(filter) {
        const cursor = await this.Book.find(filter);
            return await cursor.toArray();
        }
    async findByName(name) {
        return await this.find({
           MaSach: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Book.findOne({
           _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const nxbService = new NXBService(MongoDB.client);
        const document = await nxbService.findByName(payload.MaNXB);
        if(!document.length) return {errCode:404,message:"nxb is not exist"};
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBookData(payload);
        const result = await this.Book.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
    async delete(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async deleteAll() {
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = BookService;