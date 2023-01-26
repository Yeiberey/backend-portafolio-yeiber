const server = require("express")();
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
const routes = require("./routes/index.js");

// require("./db.js");

// const cors = require("cors");

server.name = "API";
server.use("/", routes);

module.exports = server;
