import { Request, Response, NextFunction } from "express";
import userService from "../service/user-service";

const register = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req:Request, res:Response, next:NextFunction) => {
    try {
        // @ts-ignore;
        const username = req.user?.username
        const result = await userService.get(username);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req:Request, res:Response, next:NextFunction) => {
    try {
        // @ts-ignore
        const username = req.user.username;
        const request = req.body;
        request.username = username;

        const result = await userService.update(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req:Request, res:Response, next:NextFunction) => {
    try {
        // @ts-ignore
        await userService.logout(req.user.username);
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
}
