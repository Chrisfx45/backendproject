import express, {Request, Response} from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function addRest(req : Request, res : Response){
    try {
        const {name, lat, long, desc, categ, price} = req.body
        const findRest = await prisma.restaurants.findFirst({
            where :{ name : name}
        })
        if (findRest){
            return res.status(400).send({
                msg : "Restaurant already exist"
            })
        }
        const createRest = await prisma.restaurants.create({
            data :{
                name : name,
                lat : lat,
                long : long,
                desc : desc,
                categoty : categ,
                price : price
            }
        })
        return res.status(200).send({
            msg : "Success",
            data : createRest
        })
    }
    catch(error){
        return res.status(500).send({
            msg : "Internal Server Error, Bad request"
        })

    }    
}


export async function getall(req : Request, res : Response){
    try{
        const getallRest = await prisma.restaurants.findMany()
        return res.status(200).send({
            msg :"ok",
            data : getallRest
        })
    }catch(err){
        return res.status(500).send({
            msg : "Internal Server Error, Bad request"
        })

    }

}
export async function getfeatured(req : Request, res : Response){
    try{
        const getRest = await prisma.restaurants.findMany({where:{
            featured : true
        }})
        return res.status(200).send({
            msg :"ok",
            data : getRest
        })
    }catch(err){
        return res.status(500).send({
            msg : "Internal Server Error, Bad request"
        })

    }

}