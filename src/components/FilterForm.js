import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MovieService } from '../services';

const FilterForm = ({ setMovies }) => {
    const initialValues = {
        category: '',
        rating: '',
        duration: '',
        year: '',
    };

    const validationSchema = Yup.object({
        rating: Yup.number().min(0).max(10).nullable(),
        duration: Yup.number().min(0).nullable(),
        year: Yup.number().min(1900).max(2099).nullable(),
    });

    const onSubmit = async (values) => {
        // console.log('Category:', values.category);
        // console.log('Rating:', values.rating);
        // console.log('Duration:', values.duration);
        // console.log('Year:', values.year);

        let result = await MovieService.FilterMovies(values.rating);
        setMovies([...result.results])
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="max-w-lg mx-auto p-4">
                <div className="mb-4">
                    <label htmlFor="category" className="block text-white font-semibold">
                        Category
                    </label>
                    <Field
                        as="select"
                        id="category"
                        name="category"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="">All</option>
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        {/* Add more category options here */}
                    </Field>
                </div>

                <div className="mb-4">
                    <label htmlFor="rating" className="block text-white font-semibold">
                        Rating
                    </label>
                    <Field
                        type="number"
                        id="rating"
                        name="rating"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        min="0"
                        max="10"
                        step="0.1"
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
        </Formik>
    );
};

export default FilterForm;
