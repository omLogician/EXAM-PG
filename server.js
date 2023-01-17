const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}


//middlewares
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

//routers

const userrouter = require('./routes/userRouter.js');
const eventrouter = require('./routes/eventRouter.js');
app.use('/api/user', userrouter);
app.use('/api/event', eventrouter);



//testin
app.get("/", (req, res)=>{
    res.json({
        message: "Hello"
    })
})

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server started on localhost:${PORT}`);
});