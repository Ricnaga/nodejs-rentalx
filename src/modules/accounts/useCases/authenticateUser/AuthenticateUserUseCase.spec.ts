import { AppError } from "@errors/AppError";

import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "../../repositories/implementations/in-memory/usersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUser: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUser = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUsersDTO = {
            name: "new User",
            password: "123456",
            email: "user@email.com",
            driver_license: "qwe123",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUser.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an non existent user", () => {
        expect(async () => {
            await authenticateUser.execute({
                email: "user@test.com",
                password: "123456",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});

it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
        const user: ICreateUsersDTO = {
            name: "new User",
            password: "123456",
            email: "user@email.com",
            driver_license: "qwe123",
        };

        await createUserUseCase.execute(user);

        await authenticateUser.execute({
            email: user.email,
            password: "test password",
        });
    }).rejects.toBeInstanceOf(AppError);
});
