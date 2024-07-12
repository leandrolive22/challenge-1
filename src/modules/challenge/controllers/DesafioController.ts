import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { ChallengeService } from "../service/ChallengeService";

@injectable()
class DesafioController {
    async prepareReadCsv(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(ChallengeService);
        const conversations = await service.readCsv();
 
        return response.status(200).send(conversations);
    }
}

export { DesafioController };
