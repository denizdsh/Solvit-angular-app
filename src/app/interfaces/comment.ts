export interface IComment {
    _id: string,
    _ownerId: string,
    author: string,
    authorImageUrl: URL,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    __v: Number
}