const http = require("http");
const server = http.createServer((req,res)=>
{
    // console.log(req.method,req.url)
    // res.end("hii")

    if(req.url =="/home"){
        res.end("welcome to homepage");

    }else if(req.url =="/contact"){
        res.end("this is contact page")

    }else if(req.url == "/about"){
        res.end("this is about page")
    }
    else{
        res.statusCode = 404;
        res.end("page not found")
    }
});

server.listen(3000,()=>
{
    console.log("server is running Listening on port 3000")
});