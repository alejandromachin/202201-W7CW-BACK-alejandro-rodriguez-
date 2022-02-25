require("dotenv").config();
const app = require("./server");
const serverUp = require("./server/serverUp");

const port = process.env.PORT || 4000;

(async () => {
  await serverUp(port, app);
})();
