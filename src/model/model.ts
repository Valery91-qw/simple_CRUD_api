import {v4 as uuidv4 } from "uuid";

type User = {
    id: string
    username: string
    age: string
    hobbies: string[]
}

class Store {
    users: Array<User> = [];

    async getAllUsers(): Promise<Array<User>> {
        return this.users;
    }

    async createUser(user: Pick<User, "username" | "age" | "hobbies">): Promise<User> {
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