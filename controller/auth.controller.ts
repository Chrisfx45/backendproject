import express, {Request, Response} from "express"
import { PrismaClient } from "@prisma/client"
import { genSalt,compare,hash } from "bcrypt"

const prisma = new PrismaClient()
export async function register(req : Request, res : Response){
    try {
        const {email , password, name} = req.body
        const finduser = await prisma.user.findFirst({
            where : {
                email : email
            }
        })
        if (finduser){
            return res.status(401).send({
                msg : "Email already exist"
            })
        }
        const salt = await genSalt(10)
        const hashedpass = await hash(password, salt)
        const createUser = await prisma.user.create({
            data :{
                name : name,
                email : email,
                password : hashedpass
            }
        })
        return res.status(200).send({
            msg : "OK",
            data : createUser

        })
    }
    catch (error){
        return res.status(500).send({
            msg :JSON.stringify(error),
            data : []
        })

    }

}

export async function login(req : Request, res : Response){
    try{
        const {email, password} = req.body
        const finduser = await prisma.user.findFirst({
            where:{
                email : email
            },
            include :{
                wish:true,
                saved:true
            }
        })
        if (!finduser){
            return res.status(404).send({
                msg : "Account not found or wrong password",
                data : {
                    email : email,
                    password : password
                }
            })
        }
        const isValidUser = await compare(password, finduser.password)
        if (!isValidUser){
            return res.status(404).send({
                msg : "Account not found or wrong password",
                data : {
                    email : email,
                    password : password
                }
            })
        }
        return res.status(200).send({
            msg : "OK",
            data : finduser, 
            
        })

    }catch(error){
        return res.status(500).send({
            msg :JSON.stringify(error),
            data : []
        })


    }

}
