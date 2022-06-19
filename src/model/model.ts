import {v4 as uuidv4 } from "uuid";

export interface IRowUser {
    username: string
    age: string
    hobbies: string[]
}

interface IUser extends IRowUser {
    id: string
}



class Store {
    users: Array<IUser> = [];

    async getAllUsers(): Promise<Array<IUser>> {
        return this.users;
    }

    async createUser(user: IRowUser): Promise<IUser> {
        const id = uuidv4();
        const newUser = {id, ...user};
        this.users.push(newUser);
        return newUser;
    }
}

const model = new Store();

export {
    model
}