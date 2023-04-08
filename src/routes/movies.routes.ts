import { Router } from "express";
import { 
    ensureNameMovieDoNotExists, 
    ensureIdMovieExists 
} from "../middlewares/movies.middlewares.js";
import { 
    moviePostController, 
    movieGetController, 
    movieGetByIdController,
    moviePatchController,
    movieDeleteController
} from "../controllers/movies.controllers.js"

const moviesRouter = Router();

moviesRouter.post("/movies", ensureNameMovieDoNotExists, moviePostController);
moviesRouter.get("/movies", movieGetController);
moviesRouter.get("/movies/:id", ensureIdMovieExists, movieGetByIdController);
moviesRouter.patch("/movies/:id", ensureIdMovieExists, ensureNameMovieDoNotExists, moviePatchController);
moviesRouter.delete("/movies/:id", ensureIdMovieExists, movieDeleteController);

export { moviesRouter };