import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string,
};

export default function ensureAuthenticated(request : Request, response : Response, next : NextFunction) : void {
        //Validação do token JWT

        const authHeader = request.headers.authorization;

        if (!authHeader)
        {
            throw new Error('JWT token is missing');
        }

        //Desestruturou o array, assim oq for separado pelo slip vai estar dentro dos obj do array
        const [,token] = authHeader.split(' ');
        try {
            const decoded = verify(token, authConfig.jwt.secret);

            const { sub } = decoded as TokenPayload;

            request.user = {
                id: sub,
            };

            return next();
        } catch (error) {
            throw new Error('Invalid JWT token');
        }
      

}