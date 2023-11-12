import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        if (token.startsWith('Bearer ')) {
            console.log("bearer")

            jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET as string, (err: any, user: any) => {
                console.log(err)

                if (err) return res.status(403).json({
                    errors: "Unauthorized"
                }).end();
// @ts-ignore;
            req.user = user;
                next();
              })

        } else {
            const user = await prismaClient.user.findFirst({
                where: {
                    token: token
                }
            });
            if (!user) {
                res.status(401).json({
                    errors: "Unauthorized"
                }).end();
            } else {
                // @ts-ignore;
                req.user = user;
                next();
            }
        }
    }
}
