import express, { Router } from "express";
import * as authControl from "../controller/auth.controller"

const authRoute : Router = express.Router()

authRoute.post("/register", authControl.register)
authRoute.post("/login", authControl.login)

export default authRoute