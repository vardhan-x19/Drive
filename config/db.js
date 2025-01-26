const mongoose=require('mongoose');

function connectToDB(){
  mongoose.connect(process.env.MONGO_URL).then((db)=>{
    console.log('connected to db');
  }).catch(err=>{
      console.log('the err while connecting to DB',err);
  })
  }

module.exports=connectToDB;