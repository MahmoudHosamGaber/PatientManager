import { Record, ValidationError } from "runtypes";
import { Express, NextFunction, Request, Response } from "express";

export const validateInput =
    (record: Record<any, any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            record.check(data);
            return next();
        } catch (error) {
            if (error instanceof ValidationError)
                return res.status(401).json({ message: error.details });
            return next(error);
        }
    };
