import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();
const PORT = 3333;

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(PORT, () => {
    console.log(
        `👀 Server localhost:${PORT} is being watched - 'Quis custodiet ipsos custodes? 🤔'!`
    );
});
