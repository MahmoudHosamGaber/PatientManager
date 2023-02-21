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
            if (error instanceof ValidationError) {
                if (!error.details) return next(error);
                const message = Object.keys(error.details).reduce(
                    (acc, key) => {
                        return acc + `${key} `;
                    },
                    "The following fields are invalid: "
                );
                return res.status(400).json({ message });
            }
            return next(error);
        }
    };
