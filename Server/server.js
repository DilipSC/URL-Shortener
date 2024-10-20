const express =require('express')
const mongoose =require('mongoose')
const ShortUniqueId = require('short-unique-id')
const cors =require('cors')
const app = express();
const PORT=9000;
app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/urldata')
.then(()=>{    console.log("connected to database");
})
.catch(err=>{
    console.log(err);
})

const urlschema =new mongoose.Schema({
    longurl:{
        type:String,
        required:true,
    },
    shorturl:{
        type:String,
        required:true,
        unique:true,

    }
});
const urldata= mongoose.model('urldata',urlschema)



app.post('/submit',async (req,res)=>{
    const {longUrl}=req.body;
    const id= new ShortUniqueId({length:6});
    const shortid=id.rnd();
    console.log(shortid);
    console.log(longUrl);
    const shortUrl=shortid;
    res.json({shortUrl});

    const urlpush=await new urldata({
        longurl:longUrl,
        shorturl:shortUrl
    });
    await urlpush.save();

});

app.get('/:shortid',async (req,res)=>{
    const shortid=req.params.shortid;
    const findurl=await urldata.findOne({shorturl: shortid});
    if(findurl){
        return res.redirect(findurl.longurl);
    }  
    
})





app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});