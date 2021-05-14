import { Specification } from "../../model/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
    private specification: Specification[];

    constructor() {
        this.specification = [];
    }

    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
            created_at: new Date(),
        });

        this.specification.push(specification);
    }

    findByName(name: string): Specification {
        const specification = this.specification.find(
            (specification) => specification.name === name
        );

        return specification;
    }
}
