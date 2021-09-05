import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

export class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordUseCase = container.resolve(
            ResetPasswordUserUseCase
        );

        await resetPasswordUseCase.execute({ password, token: String(token) });
        return response.json();
    }
}
