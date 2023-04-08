import { Request, Response } from "express";
import { deleteMovie, getMovies, getMoviesById, patchMovie, postMovie } from "../services/movies.services.js";

const moviePostController = async (req: Request, res: Response) => {
    const movie = await postMovie(req.body);
    return res.status(201).json(movie);
};

const movieGetController = async (req: Request, res: Response) => {
    const movies = await getMovies(req);
    return res.status(200).json(movies);
};

const movieGetByIdController = async (req: Request, res: Response) => {
    const movie = await getMoviesById(parseInt(req.params.id));
    return res.status(200).json(movie);
};

const moviePatchController = async (req: Request, res: Response) => {
    const movie = await patchMovie(req.body, parseInt(req.params.id));
    return res.status(200).json(movie);
};

const movieDeleteController = async (req: Request, res: Response) => {
    await deleteMovie(parseInt(req.params.id))
    return res.sendStatus(204);
};
 
export {
    moviePostController,
    movieGetController,
    movieGetByIdController,
    moviePatchController,
    movieDeleteController
};