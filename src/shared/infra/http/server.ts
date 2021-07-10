import { app } from "./app";

const PORT = 3333;

app.listen(PORT, () => {
    console.log(
        `👀 Server localhost:${PORT} is being watched - 'Quis custodiet ipsos custodes? 🤔'!`
    );
});
