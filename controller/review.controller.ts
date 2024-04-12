import express, {Request, Response} from "express"
import { PrismaClient } from "@prisma/client"
import { connect } from "http2"

const prisma = new PrismaClient()
export async function like(req : Request, res : Response){
    try{ 
        const {userID, restID} = req.body
        const findUser = await prisma.user.findFirst({
            where:{
                id: userID
            }
        })
        const findRest = await prisma.restaurants.findFirst({
            where:{
                id: restID
            }
        })
        if(!findUser){
            return res.status(404).send({
                msg : "User not found. Please Log in with a valid account."
            })
        }
        if(!findRest){
            return res.status(404).send({
                msg : "Restaurants not found."
            })
        }
        const findLike = await prisma.saved.findFirst({
            where:{
                userid: userID,
                restid: restID
            }
        })
        if(findLike){
            const unLike = await prisma.saved.delete({
                where:{
                    id: findLike.id
                }
            })
            return res.status(200).send({
                msg:"Ok"
            })

        }else{
            const createLike = await prisma.saved.create({
                data:{
                    user:{
                        connect:{id: userID}
                    },
                    rest :{
                        connect:{
                            id:restID
                        }
                    },
                    username : findUser.name,
                    restname : findRest. name,
                    thumbnail : findRest.link
                }
            })
            const updateRest = await prisma.restaurants.update({
                where:{id : restID},
                data:{
                    saved :{
                        connect :[{id:createLike.id}]
                    }
                }
            })
            const updateUser = await prisma.user.update({
                where:{id : userID},
                data:{
                    saved :{
                        connect :[{id:createLike.id}]
                    }
                },
                include:{
                    saved:true
                }
            })
            return res.status(200).send({
                msg :"OK",
                data :createLike,
                data1 : updateRest,

            })


        }
    }
    catch(err){
        return res.status(500).send({
            msg : "Internal Server Error, Bad request"
        })
    }
    

}
export async function whished(req : Request, res : Response){
    try{ 
        const {userID, restID} = req.body
        const findUser = await prisma.user.findFirst({
            where:{
                id: userID
            }
        })
        const findRest = await prisma.restaurants.findFirst({
            where:{
                id: restID
            }
        })
        if(!findUser){
            return res.status(404).send({
                msg : "User not found. Please Log in with a valid account."
            })
        }
        if(!findRest){
            return res.status(404).send({
                msg : "Restaurants not found."
            })
        }
        const findLike = await prisma.wishlist.findFirst({
            where:{
                userid: userID,
                restid: restID
            }
        })
        if(findLike){
            const unLike = await prisma.wishlist.delete({
                where:{
                    id: findLike.id
                }
            })
            return res.status(200).send({
                msg:"Ok"
            })

        }else{
            const createSave = await prisma.wishlist.create({
                data:{
                    user:{
                        connect:{id: userID}
                    },
                    rest :{
                        connect:{
                            id:restID
                        }
                    },
                    username : findUser.name,
                    restname : findRest. name,
                    thumbnail : findRest.link
                }
            })
            const updateRest = await prisma.restaurants.update({
                where:{id : restID},
                data:{
                    wished :{
                        connect :[{id:createSave.id}]
                    }
                }
            })
            const updateUser = await prisma.user.update({
                where:{id : userID},
                data:{
                    wish:{
                        connect :[{id:createSave.id}]
                    }
                },
                include:{
                    saved:true
                }
            })
            return res.status(200).send({
                msg :"OK",
                data :createSave,
                data1 : updateRest,

            })


        }
    }
    catch(err){
        return res.status(500).send({
            msg : "Internal Server Error, Bad request"
        })
    }
    

}