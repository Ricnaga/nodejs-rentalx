import { AppError } from "@shared/errors/AppError";

import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/usersRepositoryInMemory";
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

    it("should not be able to authenticate an non existent user", async () => {
        await expect(
            authenticateUser.execute({
                email: "user@test.com",
                password: "123456",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});

it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUsersDTO = {
        name: "new User",
        password: "123456",
        email: "user@email.com",
        driver_license: "qwe123",
    };

    await createUserUseCase.execute(user);

    await expect(
        authenticateUser.execute({
            email: user.email,
            password: "test password",
        })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
});
