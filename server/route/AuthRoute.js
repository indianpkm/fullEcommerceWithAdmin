import express from "express";
import { checkAuth, createUser, loginUser } from "../controller/Auth.js";
import passport from "passport";

const router = express.Router();
//  /auth is already added in base path
router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"),loginUser)
  .get('/check',checkAuth)

export default router;
