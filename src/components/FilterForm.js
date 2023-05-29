import React, { useEffect, useState } from 'react';
import { Field, Form, ErrorMessage, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { GetMovieGenres } from '../services/MovieService';

const FilterForm = ({ setFilter }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchMovieGenres = async () => {
            let result = await GetMovieGenres()
            setGenres([...result.genres]);
        };
        fetchMovieGenres();
    }, []);

    const validationSchema = Yup.object({
        rating: Yup.number().min(0).max(10).nullable(),
        duration: Yup.number().min(0).nullable(),
        year: Yup.number().min(1900).max(2099).nullable(),
    });

    const formik = useFormik({
        initialValues: {
            genre: '',
            rating: '0',
            duration: '',
            year: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setFilter({ ...values })
        },
    });

    return (
        <FormikProvider value={formik}>
            <Form className="w-100 py-4" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="genre" className="block text-white font-semibold">
                        Genre
                    </label>
                    <Field
                        as="select"
                        id="genre"
                        name="genre"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="">All</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </Field>
                </div>

                <div className="mb-4">
                    <label htmlFor="rating" className="block text-white font-semibold">
                        Rating: {formik.values.rating}
                    </label>
                    <Field
                        type="range"
                        id="rating"
                        name="rating"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        min="0"
                        max="10"
                        step="1"
                    />
                    <ErrorMessage name="rating" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                    <label htmlFor="duration" className="block text-white font-semibold">
                        Duration
                    </label>
                    <Field
                        type="number"
                        id="duration"
                        name="duration"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        min="0"
                    />
                    <ErrorMessage name="duration" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                    <label htmlFor="year" className="block text-white font-semibold">
                        Year
                    </label>
                    <Field
                        type="number"
                        id="year"
                        name="year"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        min="1900"
                        max="2099"
                    />
                    <ErrorMessage name="year" component="div" className="text-red-500" />
                </div>

                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
                    Filter
                </button>
            </Form>
        </FormikProvider>
    );
};

export default FilterForm;
