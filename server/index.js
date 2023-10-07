import express from "express";
import Connection from "./db/connection.js";
import ProductRoute from "./route/ProductsRoute.js";
import BrandsRoute from "./route/BrandsRoute.js";
import CategoriesRoute from "./route/CategoriesRoute.js";
import UsersRoute from "./route/UsersRoute.js";
import AuthRoute from "./route/AuthRoute.js";
import CartRoute from "./route/CartRoute.js";
import OrderRoute from "./route/OrderRoute.js";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import UserModel from "./model/UserModel.js";
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto'
import { isAuth, sanitizeUser } from "./service/common.js";

const server = express();
const port = process.env.port || 8080;
Connection();

//middleware

// server.use(express.static(path.resolve(__dirname, "build")));
// server.use(cookieParser());
server.use(
  session({
    secret: "SESSION_KEY",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

server.use(passport.authenticate("session"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(express.json());

server.use("/products",isAuth, ProductRoute);
server.use("/categories", CategoriesRoute);
server.use("/brands", BrandsRoute);
server.use("/users", UsersRoute);
server.use("/auth",AuthRoute);
server.use("/cart", CartRoute);
server.use("/orders", OrderRoute);

// Passport Strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    try {
      const user = await UserModel.findOne({ email: email });
    //   console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: 'invalid credentials' });
          }
          // const token = jwt.sign(
          //   sanitizeUser(user),
          //   process.env.JWT_SECRET_KEY
          // );
          done(null,sanitizeUser(user),); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});


server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`👉 server start at ${port}`);
});
