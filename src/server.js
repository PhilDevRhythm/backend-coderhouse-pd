import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import prodRouter from "./routes/prodRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import MainRouter from "./routes/index.js";

// SWAGGER

import { info } from "./docs/info.js";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// import helmet from "helmet";

import { loggerStart } from "./log4js.js";

// loggerStart(); en el final esta presente

const mainRouter = new MainRouter();

import { userModel } from "./daos/mongodb/models/userModel.js";

import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
// import userRouter from "./routes/userRouter.js";

import "dotenv/config";

import session from "express-session";
import validateLogin from "./middlewares/validateLogin.js";
import isAdmin from "./middlewares/isAdmin.js";

import morgan from "morgan";
import "./daos/mongodb/connection.js";

// PASSPORT
import passport from "passport";
import "./passport/github-strategy.js";

// HANDLEBARS CONFIGURATION

import handlebars from "express-handlebars";

const app = express();
app.listen(8080, () => {
  console.log(`app is on 8080 pid: ${process.pid}`);
});
// import cluster from "cluster";
// import { cpus } from "os";

// SCALABILITY SETTINGS

// const numCPUS = cpus().length;
// console.log(numCPUS);

// if (cluster.isPrimary) {
//   // proceso padre
//   console.log(`nucleos--> ${numCPUS}`);
//   console.log(`PID MASTER--> ${process.pid}`);

//   for (let index = 0; index < numCPUS; index++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code) => {
//     console.log(`worker ${worker.process.id} exited with code ${code}`);
//     cluster.fork();
//   });
//   // proceso hijo
// } else {
//   // const app = express();

app
  .engine("handlebars", handlebars.engine())
  .set("views", __dirname + "/views")
  .set("view engine", "handlebars")
  // .use(helmet())

  // app.use("/", viewsRouter);

  //USEFUL

  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(__dirname + "/public"))

  // ERROR HANDLING
  .use(errorHandler)
  .use(morgan("dev"))

  //FROM ROUTES
  // .use("/api/products", prodRouter)
  // // app.use("/views", viewsRouter);
  // .use("/api/carts", cartRouter)
  .use("/api", mainRouter.getRouter());

// app STATUS
// MONGO DB ATLAS

import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://phildevrhythm:y9Rj1GBZQm6YdPG8@phildevcluster.lizvyby.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_LOCAL_URL,
    crypto: {
      secret: process.env.MONGO_LOCAL_SECRET,
    },
    reapInterval: 30,
  }),
  secret: process.env.MONGO_LOCAL_SECRET,
  resave: false,
  saveUninitilized: false,
  cookie: {
    maxAge: 120000,
  },
};

app
  .post("/dead", async (req, res) => {
    try {
    } catch (error) {}
  })
  .post("/users/alt-login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const users = await userModel.findOne({ email });
      const index = users.findIndex(
        (user) => user.username === email && user.password === password
      );
      if (index < 0) res.json({ error: "User not found" });
      else {
        const user = users[index];
        req.session.info = {
          loggedIn: true,
          count: 1,
          admin: user.admin,
        };
        res.json({ msg: `Bienvenido ${user.username}` });
      }
    } catch {}
  })

  .use(cookieParser("secret"))

  .use(session(mongoStoreOptions))

  .use("/", viewsRouter);

app.get("/dashboard", validateLogin, (req, res) => {
  req.session.info.count++;
  res.json({
    msg: "Bienvenido",
    session: req.session,
  });
});

app.get("/admin-dashboard", validateLogin, isAdmin, (req, res) => {
  req.session.info.count++;
  res.json({
    msg: "Bienvenido Admin ",
    session: req.session,
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ msg: "Session destroyed!" });
});

// SESSION FILE STORE

// import { connectionString } from "./daos/mongodb/connection.js";

// const fileStore = sessionFileStore(session);

// SESSION

const sessionConfig = {
  secret: "secret",
  cookie: { maxAge: 10000 },
  saveUninitilized: false,
  resave: false,
};

app.use(session(sessionConfig));

// const users = [
//   { username: "admin", password: 1234, admin: true },
//   { username: "user0", password: 1234, admin: false },
// ];

// SOCKET

// const socketServer = new Server(httpServer);

// socketServer.on("connection", (socket) => {
//   console.log(`Connected id: ${socket.id}`);
//   socket.on("disconnect", () => {
//     console.log(`Disconnecting ${socket.id}`);
//   });
//   socket.emit("connected");
//   socket.on("newProduct", (obj) => {
//     products.push(obj);
//     socketServer.emit("prodList", products);
//   });
// });

// SOCKET.IO

// import { Server } from "socket.io";

// const httpServer = app.listen(8080, () => {
//   console.log(`APP is on ${8080}`);
// });

// app.get("/realtimeproducts", (req, res) => {
//   res.render("realtimeproducts");

//   ;
// });

// USAR PASSPORT SESSION ABAJO CON SESSION ACTIVO
app.use(passport.session());
app.use(passport.initialize());

loggerStart();

// }

// DOCUMENTATION

const specs = swaggerJSDoc(info);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
