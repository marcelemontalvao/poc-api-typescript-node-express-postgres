import { QueryResult } from "pg";
import { MovieEntity } from "./MovieEntity";

export type MovieResult = QueryResult<MovieEntity>;