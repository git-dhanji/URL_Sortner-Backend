

const express = require('express');
const port = 3000 || process.env.PORT 
const app = express();

app.get('/', (req, res) =>{
    res.send('Hello World!')
})


app.listen(port,()=>console.log(`Listen on http://localhost:${port}`));
