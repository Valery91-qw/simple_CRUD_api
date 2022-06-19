import {v4 as uuidv4} from "uuid";

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

    async getUser(userId: string): Promise<IUser | undefined> {
        return this.users.find(el => el.id === userId)
    }

    async updateUser(rowUser: IRowUser, userId: string): Promise<IUser | undefined> {
        this.users = this.users.map(user => user.id === userId ? {...user, ...rowUser} : user)
        return this.users.find(el => el.id === userId)
    }

    async deleteUser(userId: string): Promise<boolean> {
        const prevLength = this.users.length;
        this.users = this.users.filter(user => user.id !== userId);
        return this.users.length !== prevLength;
    }
}

const model = new Store();

export {
    model
}