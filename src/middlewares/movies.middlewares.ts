import { Request, Response, NextFunction } from 'express'
import * as moviesRepository from "../repositories/movies.repository.js"

const ensureNameMovieDoNotExists = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const name: string = request.body.name;
        const queryResult = await moviesRepository.findMovieByName(name);

        if(queryResult.rowCount >= 1) {
            return response.status(409).json({
                error: "Movie name already exists!"
            });
        };
        
        return next();
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    };
};

const ensureIdMovieExists = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

    const id: number = parseInt(request.params.id);
    const queryResult = await moviesRepository.getAnyMovieById(id);

    if(!queryResult.rowCount){
        return response.status(404).json({
            "error": "Movie not found!"
        });
    };

    return next();
};

export { ensureNameMovieDoNotExists, ensureIdMovieExists };