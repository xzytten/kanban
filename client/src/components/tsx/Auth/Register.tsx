import React, { FC, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { register } from '../../../redux/slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import { checkIsAuth } from '../../../redux/slices/AuthSlice';

import '../../scss/auth/auth.scss'

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
});

const Register: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(checkIsAuth);
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isAuth) navigate('/');
    }, [isAuth, navigate]);

    const handleSubmit = async (values: { name: string, password: string }) => {
        try {
            await dispatch(register(values))
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        console.log(isAuth)
        if (isAuth) navigate('/');
        
    }, [isAuth, navigate]);

    return (
        <div className='auth__container'>
            <Formik
                initialValues={{ name: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ dirty, isValid }) => (
                    <Form>
                        <div className='auth__container__label'>
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" className='auth__container__label__input' />
                            <ErrorMessage name="name" component="span" className="error" />
                        </div>
                        <div className='auth__container__label'>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" className='auth__container__label__input' />
                            <ErrorMessage name="password" component="span" className="error" />
                        </div>
                        <button type="submit" className='auth__container__submit' disabled={!dirty || !isValid}>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
