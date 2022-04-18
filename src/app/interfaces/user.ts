export interface IUser {
    _id: string,
    email: string,
    username: string,
    imageUrl: URL | undefined,
    accessToken: string,
}