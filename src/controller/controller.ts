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

            const newUser = await model.createUser({age: '22', username: "jon", hobbies: ['loot'] })

            res.writeHead(201, {"Content-Type": "application/json"} )
            res.end(JSON.stringify(newUser))
        } catch (e) {
            console.warn(e)
        }
    }
}