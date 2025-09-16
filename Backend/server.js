import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import shortid from "shortid";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


//MongoDb connection

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Mongodb connected"))
.catch(err => console.log(err))

//schema
const urlSchema = new mongoose.Schema({
    shortCode : {
        type : String,
        unique : true
    },
    longUrl : {
        type : String,

    },
    createdAt : {
        type: Date,
        default : Date.now
    }
});
const Url = mongoose.model("Url",urlSchema);



// Route: Create short URL
app.post("/api/shorten", async(req,res)=>{
    const {longUrl} = req.body;

    const shortCode = shortid.generate();
    const shortUrl = `${process.env.FRONTEND_URL}/${shortCode}`;
    
    const url = new Url({shortCode, longUrl});
    await url.save();

    res.json({shortUrl, longUrl});

});


// Route: Redirect
app.get("/shortCode", async(req,res) =>{
    const {shortCode} = request.params;

    const url = await Url.findOne({shortCode});

    if(url) {
        return res.redirect(url.longUrl);
    }
    else{
        return res.status(404).json("Url not found");
    }
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running on ${PORT}`) );

