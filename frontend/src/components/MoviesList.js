// src/components/MoviesList.js
import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get('/movies')
            .then((res) => setMovies(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>All Movies</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesList;
