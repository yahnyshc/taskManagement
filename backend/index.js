require('dotenv').config({path:'../config/.env'});

const express = require('express');
const mongoose = require('mongoose');
const draftsRouter = require('./routes/drafts');
const userRouter = require('./routes/user')
const cors = require('cors');  

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app = express();

app.use(express.json())
app.use(cors());

// middleware 
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/drafts', draftsRouter)
app.use('/api/user', userRouter)

mongoose.connect(MONGO_URI)
    .then(() => {
        // listen for request after connection 
        app.listen(PORT, () => {
            console.log('listening on https://localhost:'+PORT);
        });
    })
    .catch((err)=>{
        console.log(err)
    });





