import { category } from "../shared/util";

export interface ITopicData {
    title: string,
    description: string,
    imageUrl: URL | undefined,
    category: category
};