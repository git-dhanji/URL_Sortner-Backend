require('dotenv').config();
const express = require('express');
const port = 3000 || process.env.PORT 
const app = express();
const urlRouter = require('./routes/url.routes.js')
const connectDb = require('./db/connect.db.js')


connectDb(process.env.MONGODB_URI)

app.get('/', (req, res) =>{
    res.send('Hello World!')
})

app.use('/url',urlRouter)


app.listen(port,()=>console.log(`Listen on http://localhost:${port}`));
