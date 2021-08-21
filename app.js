const fs = require('fs')
const express = require('express')
const path = require('path');
const app = express()
const mongoose = require('mongoose')
const Data = require('./datamodel/data')

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.get('/connection', (req, res) => {

    var url_en = req.query
    var k = ''
    for (var key in url_en) {
        k = key;
    }
    var buf = Buffer.from(k, 'base64').toString('utf-8')

    // "mongodb+srv://rohit_145:Rohit00145@cluster0.gd2hw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    mongoose.connect(buf, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
        if (err) {
            res.status(400).send({
                message: 'MongoDB connection error !! Please Provide a Valid Url'
             });
            console.log(err)
        }
        else {
            res.status(200).send("Connected")
            console.log("connected")
        }

    })



    // console.log(buf);
   

})

var Model=null

var key_obj={}

app.get('/schema',(req,res)=>{

    var obj_in=req.query
    // console.log(obj_in)

    var r={
        type:String,
        required:true
    }
    var schema={}

    for(var key in obj_in){
       key_obj_initial=JSON.parse(key)
       key_obj=key_obj_initial[1]
       for(var k in key_obj){
        //    console.log(key_obj[k])
           schema[key_obj[k]]=r
       }
    }

    // console.log(schema)

    var t_name=key_obj_initial[0]

    var str=mongoose.Schema(schema)
    Model=mongoose.model(t_name,str)
    // console.log(Model)
    res.end()

})



app.post("/add", (req, res) => {
    var obj = req.body
    console.log(key_obj)
    for (var key in obj) {
        var inside = obj[key]
        

            var entry={}

            for(var key in key_obj){
                
                entry[key_obj[key]]=inside[key_obj[key]];
            }

            const entry_data=new Model(entry)
           
             entry_data.save()
    }
    res.end()
})

const readFile = file => {
    let data = fs.readFileSync(file);

    return data.toString().replace(/\r\n/g, '\n').split('\n')
}

// var ar=readFile('ques.txt')
// var count=0
// var obj={}
// for(let i of ar) {
//     obj[count]=i
//     count++
// }




app.listen(3000, () => {
    console.log('listening')
})