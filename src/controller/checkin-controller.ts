import { Request, Response, NextFunction } from "express";
import checkinService from "../service/checkin-service";

const create = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const result = await checkinService.create(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const result = await checkinService.get(req,res);
        res.status(200).json({
            ...result
        });
    } catch (e) {
        next(e);
    }
}


export default {
    create,
    get
}
