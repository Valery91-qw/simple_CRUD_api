import http from "http";
import {urlParser} from "./helpers/urlParser";
import {Controller} from "./controller/controller";

const PORT = 4040;

const server = http.createServer(async (req, res) => {
    const { pathname } = await urlParser(req.url)
    if(pathname === "/api/users" && req.method === "GET") {
        await Controller.allUsers(req, res)
    } else if(pathname === "/api/users" && req.method === "POST") {
            await Controller.createUser(req, res)
    } else if(pathname?.includes("/api/users/") && req.method === "GET") {
        const params = pathname?.split('/')
        const userId = params[params.length - 1]
        await Controller.getUser(req, res, userId)
    } else if(pathname?.includes("/api/users/") && req.method === "PUT") {
        const params = pathname?.split('/')
        const userId = params[params.length - 1]
        await Controller.updateUser(req, res, userId)
    } else if(pathname?.includes("/api/users/") && req.method === "DELETE") {
        const params = pathname?.split('/')
        const userId = params[params.length - 1]
        await Controller.deleteUser(req, res, userId)
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found or invalid method for route" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
