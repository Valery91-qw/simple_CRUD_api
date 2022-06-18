import http from "http";
import {urlParser} from "./helpers/urlParser";
import {Controller} from "./controller/controller";

const PORT = 4040;

const server = http.createServer(async (req, res) => {
    const path = await urlParser(req.url)
    if(path === "/api/users" && req.method === "GET") {
        await Controller.allUsers(req, res)
    } else if(path === "/api/users" && req.method === "POST") {
        await Controller.createUser(req, res)
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
