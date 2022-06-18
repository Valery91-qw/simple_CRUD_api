import {IncomingMessage, ServerResponse} from "http";
import {model} from "../model/model";

export class Controller {
    static async allUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const users = await model.getAllUsers()
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify(users))
            return;
        } catch (e) {
            console.warn(e)
        }
    }
    static async createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            let data: string = '';
            req.on("data", (chunk) => {
               data += chunk.toString();
            })
            req.on("end", async () => {
                if(data !== undefined) {
                    const reqBody = JSON.parse(data);
                    const newUser = await model.createUser(reqBody)
                    res.writeHead(201, {"Content-Type": "application/json"} )
                    res.end(JSON.stringify(newUser))
                } else {
                    return
                }
            })
        } catch (e) {
            console.warn(e)
        }
    }
}