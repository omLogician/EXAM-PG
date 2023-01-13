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

const router = require('./routes/userRouter.js')
app.use('/api/user', router)



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