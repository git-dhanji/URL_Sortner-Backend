require('dotenv').config();
const express = require('express');
const path = require('path');
const port = 3000 || process.env.PORT
const app = express();
const urlRouter = require('./routes/url.routes.js')
const userRouter = require('./routes/user.routes.js');  
const connectDb = require('./db/connect.db.js')
const URL = require('./models/url.models.js')
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views',path.resolve('./src/views'))

connectDb(`${process.env.MONGODB_URI}/sorturl`)


app.get('/', async(req, res) => {
    res.render('home')
})

//Url Routes
app.use('/url', urlRouter )


//user routes
app.use('/users',userRouter)


app.listen(port, () => console.log(`Listen on http://localhost:${port}`));
