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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const database_1 = require("../application/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }
    else {
        if (token.startsWith('Bearer ')) {
            console.log("bearer");
            jsonwebtoken_1.default.verify(token.split(' ')[1], process.env.TOKEN_SECRET, (err, user) => {
                console.log(err);
                if (err)
                    return res.status(403).json({
                        errors: "Unauthorized"
                    }).end();
                // @ts-ignore;
                req.user = user;
                next();
            });
        }
        else {
            const user = yield database_1.prismaClient.user.findFirst({
                where: {
                    token: token
                }
            });
            if (!user) {
                res.status(401).json({
                    errors: "Unauthorized"
                }).end();
            }
            else {
                // @ts-ignore;
                req.user = user;
                next();
            }
        }
    }
});
exports.authMiddleware = authMiddleware;
