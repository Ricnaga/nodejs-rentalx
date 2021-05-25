import { Category } from "../infra/typeorm/entities/Category";

export type ICreateCategoryDTO = {
    name: string;
    description: string;
};

export interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}
