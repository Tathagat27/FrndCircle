import { Jwt } from "jsonwebtoken";
import { User } from "../models/userModel";
import expressAsyncHandler from "express-async-handler";

const product = expressAsyncHandler(async (req, res, next) => {
    let token;

    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = Jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password");
            next();

        } catch (error) {
            
        }
    }
})