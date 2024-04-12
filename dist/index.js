"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const rest_router_1 = __importDefault(require("./routers/rest.router"));
const rev_routter_1 = __importDefault(require("./routers/rev.routter"));
const app = (0, express_1.default)();
const PORT = 5670;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/api/auth", auth_router_1.default);
app.use("/api/rest", rest_router_1.default);
app.use("/api/rev", rev_routter_1.default);
app.get("/api", (req, res) => {
    return res.status(200).send({
        msg: "OK"
    });
});
app.listen(PORT, () => {
    console.log("hey its running on ", PORT);
});
