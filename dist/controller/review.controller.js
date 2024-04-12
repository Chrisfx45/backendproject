"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whished = exports.like = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function like(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userID, restID } = req.body;
            const findUser = yield prisma.user.findFirst({
                where: {
                    id: userID
                }
            });
            const findRest = yield prisma.restaurants.findFirst({
                where: {
                    id: restID
                }
            });
            if (!findUser) {
                return res.status(404).send({
                    msg: "User not found. Please Log in with a valid account."
                });
            }
            if (!findRest) {
                return res.status(404).send({
                    msg: "Restaurants not found."
                });
            }
            const findLike = yield prisma.saved.findFirst({
                where: {
                    userid: userID,
                    restid: restID
                }
            });
            if (findLike) {
                const unLike = yield prisma.saved.delete({
                    where: {
                        id: findLike.id
                    }
                });
                return res.status(200).send({
                    msg: "Ok"
                });
            }
            else {
                const createLike = yield prisma.saved.create({
                    data: {
                        user: {
                            connect: { id: userID }
                        },
                        rest: {
                            connect: {
                                id: restID
                            }
                        },
                        username: findUser.name,
                        restname: findRest.name,
                        thumbnail: findRest.link
                    }
                });
                const updateRest = yield prisma.restaurants.update({
                    where: { id: restID },
                    data: {
                        saved: {
                            connect: [{ id: createLike.id }]
                        }
                    }
                });
                const updateUser = yield prisma.user.update({
                    where: { id: userID },
                    data: {
                        saved: {
                            connect: [{ id: createLike.id }]
                        }
                    },
                    include: {
                        saved: true
                    }
                });
                return res.status(200).send({
                    msg: "OK",
                    data: createLike,
                    data1: updateRest,
                });
            }
        }
        catch (err) {
            return res.status(500).send({
                msg: "Internal Server Error, Bad request"
            });
        }
    });
}
exports.like = like;
function whished(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userID, restID } = req.body;
            const findUser = yield prisma.user.findFirst({
                where: {
                    id: userID
                }
            });
            const findRest = yield prisma.restaurants.findFirst({
                where: {
                    id: restID
                }
            });
            if (!findUser) {
                return res.status(404).send({
                    msg: "User not found. Please Log in with a valid account."
                });
            }
            if (!findRest) {
                return res.status(404).send({
                    msg: "Restaurants not found."
                });
            }
            const findLike = yield prisma.wishlist.findFirst({
                where: {
                    userid: userID,
                    restid: restID
                }
            });
            if (findLike) {
                const unLike = yield prisma.wishlist.delete({
                    where: {
                        id: findLike.id
                    }
                });
                return res.status(200).send({
                    msg: "Ok"
                });
            }
            else {
                const createSave = yield prisma.wishlist.create({
                    data: {
                        user: {
                            connect: { id: userID }
                        },
                        rest: {
                            connect: {
                                id: restID
                            }
                        },
                        username: findUser.name,
                        restname: findRest.name,
                        thumbnail: findRest.link
                    }
                });
                const updateRest = yield prisma.restaurants.update({
                    where: { id: restID },
                    data: {
                        wished: {
                            connect: [{ id: createSave.id }]
                        }
                    }
                });
                const updateUser = yield prisma.user.update({
                    where: { id: userID },
                    data: {
                        wish: {
                            connect: [{ id: createSave.id }]
                        }
                    },
                    include: {
                        saved: true
                    }
                });
                return res.status(200).send({
                    msg: "OK",
                    data: createSave,
                    data1: updateRest,
                });
            }
        }
        catch (err) {
            return res.status(500).send({
                msg: "Internal Server Error, Bad request"
            });
        }
    });
}
exports.whished = whished;
