import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "@config/auth";
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string,
};

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    //Validação do token JWT

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    //Desestruturou o array, assim oq for separado pelo slip vai estar dentro dos obj do array
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        // Expose user object inside request
        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token.', 401);
    }

}