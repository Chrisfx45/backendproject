import express, { Router } from "express";
import * as revControl from "../controller/review.controller"

const revRoute : Router = express.Router()

revRoute.post("/like",revControl.like)
revRoute.post("/wish",revControl.whished)

export default revRoute