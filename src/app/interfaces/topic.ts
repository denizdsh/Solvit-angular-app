import { category } from "../shared/util";

export interface ITopic {
    _id: string,
    _ownerId: string,
    author: string,
    category: category,
    title: string,
    description: string,
    imageUrl: URL,
    likes: string[],
    _likesCount: number,
    comments: number,
    createdAt: string,
    updatedAt: string,
    __v: Number
}