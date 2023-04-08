import { client } from "../config/database.js";
import { MovieRequest } from "../protocols/MovieRequest.js";
import { MovieResult } from "../protocols/MovieResult.js";
import { MovieEntity } from "../protocols/MovieEntity.js";
import { QueryResult } from "pg";
import QueryString from "qs";
import format from "pg-format";

async function createMovie(payload: MovieRequest): Promise<MovieResult> {
    const queryResult = await client.query( `
        INSERT INTO
            movies(name, category, duration, price)
        VALUES
            ($1, $2, $3, $4)
        RETURNING *;
    `,
    [ payload.name, payload.category, payload.duration, payload.price ]);
    return queryResult;
}

async function getAllMovies(): Promise<MovieResult> {
    const queryResult = await client.query(`SELECT * FROM movies;`)
    return queryResult;
}

async function getAllMoviesByCategory(category: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]): Promise<QueryResult<Array<MovieEntity>>> {
    const queryResult = await client.query(`SELECT * FROM movies WHERE category=$1;`, [ category ])
    return queryResult;
}

async function getAnyMovieById(id:number): Promise<MovieResult> {
    const queryResult = await client.query(`SELECT * FROM movies WHERE id=$1;`, [id]);
    return queryResult;
}

async function updatePartialMovie(payload: Partial<MovieRequest>, id: number): Promise<MovieResult> {
    const queryString: string = format(`
        UPDATE
            movies
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult = await client.query(queryString, [id]);
    return queryResult;
}

async function deleteAnyMovieById(id:number): Promise<MovieResult> {
    const queryResult = await client.query(`
        DELETE FROM
            movies
        WHERE
            id = $1;    
    `, [id]);
    return queryResult;
}

async function findMovieByName(name: string): Promise<QueryResult<MovieEntity>> {
    const queryResult = await client.query(`SELECT name FROM movies WHERE name=$1;`, [ name ])
    return queryResult;
}

export { 
    createMovie, 
    getAllMovies, 
    getAnyMovieById, 
    getAllMoviesByCategory, 
    updatePartialMovie, 
    deleteAnyMovieById, 
    findMovieByName
};
