const {ObjectId} = require("mongodb");
const MongoDB = require("../utils/mongo");
const ReaderService = require("./readerService");
const BookService = require("./bookService");
class FollowBookService{
    constructor(client){
        this.FollowBook = client.db().collection("followBook");
    }
    extractFollowBookData(payload){
        const today = new Date(); 
        const nextweek = new Date();
        nextweek.setDate(today.getDate() + 7)
       const followBook = {
           MaDocGia:payload.MaDocGia,
           MaSach:payload.MaSach,
           NgayMuon:today,
           NgayTra:nextweek,
           DaTra:payload.DaTra
       };
       Object.keys(followBook).forEach(
           (key)=>followBook[key] === undefined && delete followBook[key]
       );
       return followBook;
    }
    async create(payload){
        const followBook = this.extractFollowBookData(payload);
        const readerService = new ReaderService(MongoDB.client);
        const readerExist = await readerService.findByName(payload.MaDocGia);
        const bookService = new BookService(MongoDB.client);
        const bookExist = await bookService.findByName(payload.MaSach);
        if(!readerExist.length||!bookExist.length) return {errCode:404,message:"Book or reader is not exist"}
        if(bookExist[0].SoQuyen==0) return {errCode:401,message:"Book is sold out"}
        await bookService.update(bookExist[0]._id,{SoQuyen:bookExist[0].SoQuyen-1})
        const result = await this.FollowBook.findOneAndUpdate(
            followBook,
            {$set:{publish : followBook.publish === true}},
            {returnDocument:"after",upsert:true}
        )
        return {errCode:200,result,message:"Create follow Book success"};
    }
    async find(filter) {
        const cursor = await this.FollowBook.find(filter);
            return await cursor.toArray();
        }
    async findByName(name) {
        return await this.find({
           MaSach: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.FollowBook.findOne({
           _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const readerService = new ReaderService(MongoDB.client);
        const readerExist = await readerService.findByName(payload.MaDocGia);
        const bookService = new BookService(MongoDB.client);
        const bookExist = await bookService.findByName(payload.MaSach);
        if(!readerExist.length||!bookExist.length) return {errCode:404,message:"Book or reader is not exist"}
        if(bookExist[0].SoQuyen==0) return {errCode:401,message:"Book is sold out"}
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractFollowBookData(payload);
        const result = await this.FollowBook.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
    async delete(id) {
        const result = await this.FollowBook.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async deleteAll() {
        const result = await this.FollowBook.deleteMany({});
        return result.deletedCount;
    }
    async giveBook(id){
        const followBookService = new FollowBookService(MongoDB.client);
        const followBook = await followBookService.findById(id);
        const bookService = new BookService(MongoDB.client);
        const bookExist = await bookService.findByName(followBook.MaSach);
    
        if(bookExist.length > 0 && followBook.DaTra=="Đang mượn") {
            const currentDate = new Date();
            await bookService.update(bookExist[0]._id, {SoQuyen: bookExist[0].SoQuyen + 1});
            if(currentDate > followBook.NgayTra) {
                await this.FollowBook.findOneAndUpdate(
                    followBook,
                    {$set: {DaTra: "Quá hạn"}},
                    {returnDocument: "after", upsert: true}
                    );
                    return {errCode: 200, message: "Ngày hiện tại vượt qua Ngày trả"};
                } else {
                    await this.FollowBook.findOneAndUpdate(
                        followBook,
                        {$set: {DaTra: "Đã trả",NgayTra:currentDate}},
                        {returnDocument: "after", upsert: true}
                    );
                return {errCode: 200, message: "give book success"};
            }
        } else {
            return {errCode: 400, message: "Sách không tồn tại hoặc đã được trả"};
        }
    }
    
}
module.exports = FollowBookService;