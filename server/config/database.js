const mongoose = require('mongoose');

async function connect (){
    try{
        //console.log(process.env.DATABASE_URI);
        await mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
    }
    catch(e){
        console.log("mongoo error ",e);
    }
}
module.exports = connect;