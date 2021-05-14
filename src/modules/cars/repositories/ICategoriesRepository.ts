import { Category } from "../model/Category";

export type ICreateCategoryDTO = {
    name: string;
    description: string;
};

export interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}
