import url from "url";

export async function urlParser(path: string | undefined) {
    if (path) {
        return url.parse(path, true);
    } else {
        throw new Error('I don\'t now what is it')
    }
}