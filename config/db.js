const mongoose = require('mongoose');

async function initDb() {
    try{
    await mongoose.connect('mongodb+srv://iloabuchijohnson112:mcqueenparker@cluster0.hahpzi1.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`connected to Database`)
    }
       catch(e)  {
        console.log(e,`not connected to Databse`)
    }
}

module.exports = initDb;