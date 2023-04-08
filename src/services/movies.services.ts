import { Request } from "express"
import { QueryArrayResult } from "pg";
import { MovieEntity } from "../protocols/MovieEntity.js";
import { MovieRequest } from "../protocols/MovieRequest.js";
import { MovieResult } from "../protocols/MovieResult.js";
import * as moviesRepository from "../repositories/movies.repository.js"

const postMovie = async (payload: MovieRequest): Promise<MovieEntity> => {
    const queryResult: MovieResult = await moviesRepository.createMovie(payload);
    const newMovie = queryResult.rows[0];
    return newMovie;
};

const getMovies = async (request: Request): Promise<MovieEntity[] | MovieEntity[][]> => {
    let queryResult: MovieResult | QueryArrayResult<Array<MovieEntity>>;
    if(request.query.category != undefined) {
        const category = request.query.category;
        queryResult = await moviesRepository.getAllMoviesByCategory(category);
        return queryResult.rows;
    } else {
        queryResult = await moviesRepository.getAllMovies();
        return queryResult.rows;
    };
};

const getMoviesById = async (id: number): Promise<MovieEntity>  => {
    const queryResult = await moviesRepository.getAnyMovieById(id);
    return queryResult.rows[0];
};

const patchMovie = async (payload: Partial<MovieRequest>, id: number): Promise<MovieEntity> => {
    const queryResult = await moviesRepository.updatePartialMovie(payload, id);
    return queryResult.rows[0];
};

const deleteMovie = async (id: number) => {
   const queryResult = await moviesRepository.deleteAnyMovieById(id);
   return queryResult;    
};

export { postMovie, getMovies, getMoviesById, patchMovie, deleteMovie };
