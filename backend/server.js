require('dotenv').config();
const express = require('express');
const draftsRouter = require('./routes/drafts');

const PORT = process.env.PORT;

app = express();

app.use(express.json())

// middleware 
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/drafts', draftsRouter)

app.listen(PORT, () => {
    console.log('listening on localhost:'+PORT);
});



