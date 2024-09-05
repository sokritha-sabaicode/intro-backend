import { connection } from "./database/connection";
import app from "./app";

const port = 4000;

const startServer = async () => {
  try {
    await connection();

    app.listen(port, () => {
      console.log(`app running at ${port}`)
    })
  } catch (error) {
    process.exit(1);
  }
}

startServer();

