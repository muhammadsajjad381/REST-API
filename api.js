const { log } = require("console");
const express = require("express");
const app = express();
app.use(express.json()) //middleware reading jsondata
app.get('/', (req, res) => {
    res.send(
        {
            message:'Welcome to our first API'

        }
    )
    res.status(200)
})

app.listen(3000, () => console.log('server is running on port 3000'))