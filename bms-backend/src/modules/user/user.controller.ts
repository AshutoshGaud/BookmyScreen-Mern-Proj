import { NextFunction, Response, Request } from "express";  
import * as UserService from './user.service';
import { error } from "console";

export const createUser = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req:Request, res: Response, next: NextFunction) => {
    try{
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next (error);
    
    }
}

export const getUserById = async (req:Request, res:Response, next: NextFunction) => {
    try{
        const user = await UserService.getUserById(req.user?._id);
        if(!user){
            res.status(404).json({message: 'user not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const activateUser = async (req:Request, res: Response, next: NextFunction) => {
    try{

        const userId = req.params.id;
        const updateData = req.body;
        updateData.activateUser = true;
        const updateUser = await UserService.activateUser(userId, updateData);
        res.status(200).json(updateUser);

    } catch (error) {
        next(error);
    }
}