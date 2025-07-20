// src/components/AddMovie.js
import React, { useState } from 'react';
import api from '../api/axiosInstance';

const AddMovie = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post('/movies', { title });
            alert('Movie added');
        } catch (err) {
            alert('Error');
        }
    };

    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Movie Title" />
            <button onClick={handleSubmit}>Add Movie</button>
        </div>
    );
};

export default AddMovie;
