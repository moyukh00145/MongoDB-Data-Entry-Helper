const mongoose=require('mongoose')

const datamodel=mongoose.Schema({
    No:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('Check_data',datamodel);