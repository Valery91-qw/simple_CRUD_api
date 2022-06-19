import {IncomingMessage, ServerResponse} from "http";
import {model} from "../model/model";
import {bodyValidator} from "../helpers/bodyValidator";
import {validate} from "uuid";

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
                    try {
                        const reqBody = JSON.parse(data);
                        const isValid = bodyValidator(reqBody);
                        if (!isValid) {
                            res.writeHead(400, {"Content-Type": "application/json"})
                            res.end(JSON.stringify({message: `fields: username, age, hobbies is required`}))
                        }
                        const newUser = await model.createUser(reqBody)
                        res.writeHead(201, {"Content-Type": "application/json"})
                        res.end(JSON.stringify(newUser))
                    } catch (e) {
                        res.writeHead(400, {"Content-Type": "application/json"})
                        res.end(JSON.stringify({message: "Not Valid JSON"}))
                    }
                }
            })
        } catch (e) {
            console.warn(e)
        }
    }

    static async getUser(req: IncomingMessage, res: ServerResponse, userId: string): Promise<void> {
        const isValidUUID = validate(userId)
        if(isValidUUID) {
            const user = await model.getUser(userId)
            if(user) {
                res.writeHead(201, {"Content-Type": "application/json"})
                res.end(JSON.stringify(user))
            } else {
                res.writeHead(404, {"Content-Type": "application/json"})
                res.end(JSON.stringify({message: `user not found`}))
            }
        } else {
            res.writeHead(400, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: `invalid UUID`}))
        }
    }

    static async updateUser(req: IncomingMessage, res: ServerResponse, userId: string) {
        const isValidUUID = validate(userId)
        if(isValidUUID) {
            const user = await model.getUser(userId)
            if(user) {
                try {
                    let data: string = '';
                    req.on("data", (chunk) => {
                        data += chunk.toString();
                    })
                    req.on("end", async () => {
                        if (data !== undefined) {
                            try {
                                const reqBody = JSON.parse(data);
                                const isValid = bodyValidator(reqBody);
                                if (!isValid) {
                                    res.writeHead(400, {"Content-Type": "application/json"})
                                    res.end(JSON.stringify({message: `fields: username, age, hobbies is required`}))
                                }
                                const newUser = await model.updateUser(reqBody, userId)
                                res.writeHead(201, {"Content-Type": "application/json"})
                                res.end(JSON.stringify(newUser))
                            } catch (e) {
                                res.writeHead(400, {"Content-Type": "application/json"})
                                res.end(JSON.stringify({message: "Not Valid JSON"}))
                            }
                        }
                    })
                } catch (e) {
                    console.warn(e)
                }
            } else {
                res.writeHead(404, {"Content-Type": "application/json"})
                res.end(JSON.stringify({message: `user not found`}))
            }
        } else {
            res.writeHead(400, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: `invalid UUID`}))
        }
    }
}