import { MovieEntity } from "./MovieEntity";

export type Movie = Omit<MovieEntity, "id">;