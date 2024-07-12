import bodyParser from 'body-parser';
import { ValidationError } from "class-validator";
import cors from 'cors';
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import "reflect-metadata";
import { router } from "./modules/routes";
import { AppError } from "./shared/errors/AppError";
   
dotenv.config();

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
 
app.use(router);

app.get("/", (request: Request, response: Response) => {
    return response.json({msg: "API OKAY"});
});

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                validateError: [{ constraints: { message: err.message } }],
            });
        }
        if (err[0] instanceof ValidationError) {
            return response.status(400).json({ validateError: err });
        }
        console.error(err);
        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err}`,
        });
    }
); 

app.listen(8081, () => 'server running on port 8080'); 
