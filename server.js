const http = require("http");
const fs = require("fs/promises");
const path = require("path")
const server = http.createServer(async(req,res)=>{
    // console.log(req.method,req.url)
    // res.end("hii")

    // if(req.url =="/home"){
    //     res.end("welcome to homepage");

    // }else if(req.url =="/contact"){
    //     res.end("this is contact page")

    // }else if(req.url == "/about"){
    //     res.end("this is about page")
    // }
    // else{
    //     res.statusCode = 404;
    //     res.end("page not found")
    // }

    let filepath;
    if(req.url == "/home"){
        filepath = path.join(__dirname,"pages","home.html")
    }else if(req.url == "/about"){
        filepath = path.join(__dirname,"pages","about.html")
    }else if(req.url == "/contact"){
        filepath = path.join(__dirname,"pages","contact.html")
    }else if(req.url =="/css/style.css"){
        filepath = path.join(__dirname,"public",req.url)
        console.log(filepath)
    }else{
        res.statusCode = 404;
        res.end("page not found");
    }
    try{
        const data = await fs.readFile(filepath);
        let ext = path.extname(filepath)
        
        if(ext == ".css"){
            res.writeHead(200,{"content-type":"text/css"})
        }else{
            res.writeHead(200,{"content_type":"type/html"})
            res.end(data)

        }

    }catch(error){
        if(error == "ENOENT"){
            res.statusCode = 404;
            res.end("page not found")
        }else{
            res.statusCode = 500;
            res.end("Server error")
        }
    }
});

server.listen(3000,()=>
{
    console.log("server is running Listening on port 3000")
});