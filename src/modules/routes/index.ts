import { Router } from "express";

import { routerDesafio } from "./challenge";
const router = Router();

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger_output.json';

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
router.use("/challenge", routerDesafio);

export { router };
