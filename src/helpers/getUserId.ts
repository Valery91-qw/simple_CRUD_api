export function getUserId(pathname: string): string {
    const params = pathname?.split('/')
    return params[params.length - 1]
}