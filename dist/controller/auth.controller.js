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
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, name } = req.body;
            const finduser = yield prisma.user.findFirst({
                where: {
                    email: email
                }
            });
            if (finduser) {
                return res.status(401).send({
                    msg: "Email already exist"
                });
            }
            const salt = yield (0, bcrypt_1.genSalt)(10);
            const hashedpass = yield (0, bcrypt_1.hash)(password, salt);
            const createUser = yield prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedpass
                }
            });
            return res.status(200).send({
                msg: "OK",
                data: createUser
            });
        }
        catch (error) {
            return res.status(500).send({
                msg: JSON.stringify(error),
                data: []
            });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const finduser = yield prisma.user.findFirst({
                where: {
                    email: email
                },
                include: {
                    wish: true,
                    saved: true
                }
            });
            if (!finduser) {
                return res.status(404).send({
                    msg: "Account not found or wrong password",
                    data: {
                        email: email,
                        password: password
                    }
                });
            }
            const isValidUser = yield (0, bcrypt_1.compare)(password, finduser.password);
            if (!isValidUser) {
                return res.status(404).send({
                    msg: "Account not found or wrong password",
                    data: {
                        email: email,
                        password: password
                    }
                });
            }
            return res.status(200).send({
                msg: "OK",
                data: finduser,
            });
        }
        catch (error) {
            return res.status(500).send({
                msg: JSON.stringify(error),
                data: []
            });
        }
    });
}
exports.login = login;
