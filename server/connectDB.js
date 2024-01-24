const mongoose = require('mongoose');
require('dotenv').config()


const userName = process.env.userName;
const password = process.env.password;
const dbName = process.env.dbName;

const mongoURI = `mongodb+srv://${userName}:${password}@cluster0.nseogpr.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res)=> {
  if(res){
    console.log("Conneted to mongoDB...")
  } else {
    console.log(err)
  }
})