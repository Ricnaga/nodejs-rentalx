import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it("should be able to send forgot password mail to user", async () => {
        const sendMail = spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "test-123",
            email: "test@email.com.br",
            name: "usuario teste",
            password: "123456",
        });

        await sendForgotPasswordMailUseCase.execute("test@email.com.br");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an mail if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("test@email.com.br")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(usersTokenRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "test-456",
            email: "test2@email2.com.br",
            name: "usuario teste2",
            password: "654321",
        });

        await sendForgotPasswordMailUseCase.execute("test2@email2.com.br");

        expect(generateTokenMail).toBeCalled();
    });
});
