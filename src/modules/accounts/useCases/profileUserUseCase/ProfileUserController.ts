import { Request, response, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

export class ProfileUserController {
    async handle(request: Request, repsonse: Response): Promise<Response> {
        const { id } = request.user;
        const profileUserUseCase = container.resolve(ProfileUserUseCase);
        const user = await profileUserUseCase.execute(id);

        return response.json(user);
    }
}
