import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();
const PORT = 3333;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(PORT, () => {
    console.log(
        `👀 Server localhost:${PORT} is being watched - 'Quis custodiet ipsos custodes? 🤔'!`
    );
});
