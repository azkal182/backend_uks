import express from "express";
import userController from "../controller/user-controller";
import checkinController from "../controller/checkin-controller";

const publicRouter = express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);

publicRouter.get('/api/checkin', checkinController.get);
publicRouter.post('/api/checkin', checkinController.create);
export {
    publicRouter
}
