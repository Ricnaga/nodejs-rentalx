import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        dayjsDateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "Test-plate",
            fine_amount: 40,
            category_id: "Category_Test_ID",
            brand: "Brand Test",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expect_return_date: dayAdd24hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expect_return_date: dayAdd24hours,
            user_id: "12345",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expect_return_date: dayAdd24hours,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for this user!")
        );
    });

    it("should not be able to create a new rental if there is another open to same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expect_return_date: dayAdd24hours,
            user_id: "12345",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expect_return_date: dayAdd24hours,
            })
        ).rejects.toEqual(new AppError("This car is unavailable"));
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "test",
                expect_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time!"));
    });
});
