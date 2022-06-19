import {IRowUser} from "../model/model";

export function bodyValidator(user: IRowUser): boolean {
    const requiredKeys = ["username", "age", "hobbies"];
    let isValid = true;
    for (let i = 0; i < requiredKeys.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(user, requiredKeys[i])) {
            isValid = false;
        }
    }
    return isValid;
}