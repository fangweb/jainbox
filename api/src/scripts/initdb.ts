import * as dotenv from "dotenv";
import * as fs from "fs-extra";
import { Client } from "pg";

dotenv.config();
const init = async () => {
  const options: object = {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
  };

  const client = new Client(options);
  try {
    await client.connect();
    const sql = await fs.readFile("../../init.sql", {
      encoding: "UTF-8"
    });
    const statements = sql.split(/;\s*$/m);
    for (const statement of statements) {
      if (statement.length > 3) {
        await client.query(statement);
      }
    }
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
};

init()
  .then(() => {
    console.log("success");
  })
  .catch(error => console.log(error));
