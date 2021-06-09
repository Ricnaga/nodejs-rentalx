import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

type IRequest = {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
};

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const {
                name,
                description,
                daily_rate,
                license_plate,
                fine_amount,
                brand,
                category_id,
            } = request.body;

            const createCarUseCase = container.resolve(CreateCarUseCase);

            const car = await createCarUseCase.execute({
                name,
                description,
                daily_rate,
                license_plate,
                fine_amount,
                brand,
                category_id,
            });
            return response.status(201).json(car);
        } catch (error) {
            return response.json(error);
        }
    }
}

export { CreateCarController };
