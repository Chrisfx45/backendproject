import express, { Application, Request, Response } from "express";
import cors from "cors"
import authRoute from "./routers/auth.router";
import restRoute from "./routers/rest.router";
import revRoute from "./routers/rev.routter";

const app : Application = express()
const PORT : Number = 5670

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/rest", restRoute)
app.use("/api/rev", revRoute)
app.get("/api", (req : Request, res : Response)=>{
    return res.status(200).send({
        msg : "OK"
    })
})


app.listen(PORT, ()=>{
    console.log("hey its running on ", PORT)
})
