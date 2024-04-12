import express, { Router } from "express";
import * as restControl from "../controller/restaurants.controller"

const restRoute : Router = express.Router()

restRoute.post("/create", restControl.addRest)
restRoute.get("/getall",restControl.getall)
restRoute.get("/getfeat",restControl.getfeatured)

export default restRoute