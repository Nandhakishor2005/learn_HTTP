const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const server = http.createServer(async (req, res) => {

    let filepath;

    if (req.url === "/" || req.url === "/home") {
        filepath = path.join(__dirname, "pages", "home.html");

    } else if (req.url === "/about") {
        filepath = path.join(__dirname, "pages", "about.html");

    } else if (req.url === "/contact") {
        filepath = path.join(__dirname, "pages", "contact.html");

    } else if (req.url === "/css/style.css") {
        filepath = path.join(__dirname, "public", "css", "style.css");

    } else {
        res.statusCode = 404;
        res.end("Page not found");
        return;
    }

    try {
        const data = await fs.readFile(filepath);
        const ext = path.extname(filepath);

        if (ext === ".css") {
            res.writeHead(200, {
                "Content-Type": "text/css"
            });
        } else if (ext === ".html") {
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
        }

        res.end(data);

    } catch (error) {

        console.log(error);

        if (error.code === "ENOENT") {
            res.statusCode = 404;
            res.end("Page not found");
        } else {
            res.statusCode = 500;
            res.end("Server error");
        }
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});