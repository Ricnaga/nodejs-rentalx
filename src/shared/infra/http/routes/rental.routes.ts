import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const createRentalController = new CreateRentalController();
export const rentalRoutes = Router();

rentalRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createRentalController.handle
);
