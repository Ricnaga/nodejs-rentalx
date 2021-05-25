import { Specification } from "../infra/typeorm/entities/Specification";

export type ICreateSpecificationDTO = {
    name: string;
    description: string;
};

export interface ISpecificationsRepository {
    create({ description, name }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}
