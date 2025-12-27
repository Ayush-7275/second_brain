import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./secret.js";

interface Irequest extends Request {
    userId?: string;
}

export const verifying = (
    req: Irequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers["token"];
    try {
        const decoded = jwt.verify(token as string, JWT_PASSWORD);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized User" });
    }
};
