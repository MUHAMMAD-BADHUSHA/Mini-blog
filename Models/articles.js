const mongoose=require('mongoose')
const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0]; 
};

const articleSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        
    },
   
    date:{
        type:Date,
        default:Date.now

    },
    time:{
        type: String,
         default: getCurrentTime
    },
   
})
module.exports =mongoose.model('articles',articleSchema)