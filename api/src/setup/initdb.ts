import * as dotenv from "dotenv";
import * as fs from "fs-extra";
import { Client } from "pg";

dotenv.config();
const init = async () => {
  const options: object = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  };

  const client = new Client(options);
  try {
    await client.connect();
    const sql = await fs.readFile("src/setup/init.sql", { encoding: "UTF-8" });
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
