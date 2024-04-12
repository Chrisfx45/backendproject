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
exports.getfeatured = exports.getall = exports.addRest = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function addRest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, lat, long, desc, categ, price } = req.body;
            const findRest = yield prisma.restaurants.findFirst({
                where: { name: name }
            });
            if (findRest) {
                return res.status(400).send({
                    msg: "Restaurant already exist"
                });
            }
            const createRest = yield prisma.restaurants.create({
                data: {
                    name: name,
                    lat: lat,
                    long: long,
                    desc: desc,
                    categoty: categ,
                    price: price
                }
            });
            return res.status(200).send({
                msg: "Success",
                data: createRest
            });
        }
        catch (error) {
            return res.status(500).send({
                msg: "Internal Server Error, Bad request"
            });
        }
    });
}
exports.addRest = addRest;
function getall(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getallRest = yield prisma.restaurants.findMany();
            return res.status(200).send({
                msg: "ok",
                data: getallRest
            });
        }
        catch (err) {
            return res.status(500).send({
                msg: "Internal Server Error, Bad request"
            });
        }
    });
}
exports.getall = getall;
function getfeatured(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getRest = yield prisma.restaurants.findMany({ where: {
                    featured: true
                } });
            return res.status(200).send({
                msg: "ok",
                data: getRest
            });
        }
        catch (err) {
            return res.status(500).send({
                msg: "Internal Server Error, Bad request"
            });
        }
    });
}
exports.getfeatured = getfeatured;
