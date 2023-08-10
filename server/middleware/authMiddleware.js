import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

export const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password");
            next();

        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failure");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("NOT authorized, No Token");
    }
})