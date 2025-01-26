const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    trim:true,
    required:true,
    lowercase:true,
    minLength:[3,'userName must me 3 letters'],
    
  },
  email:{
    type:String,
    trim:true,
    required:true,
    lowercase:true,
    minLength:[8,'userName must me 3 letters'],
    unique:true,
  }
  ,
  password:{
    type:String,
    trim:true,
    required:true,
    minLength:[4,'userName must me 4 letters'],
    
  }
})

const user=mongoose.model('example',userSchema);

module.exports=user;