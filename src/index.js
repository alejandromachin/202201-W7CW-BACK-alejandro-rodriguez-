require("dotenv").config();
const connectToDataBase = require("./database");
const app = require("./server");
const serverUp = require("./server/serverUp");

const port = process.env.PORT || 4000;
const connectionString = process.env.MONGODB;

(async () => {
  await connectToDataBase(connectionString);
  await serverUp(port, app);
})();
