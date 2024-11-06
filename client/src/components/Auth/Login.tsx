import { FC, useEffect} from 'react';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook'  ;
import { login } from '../../redux/slices/AuthSlice';
import { checkIsAuth } from '../../redux/slices/AuthSlice';
import AuthMenu from './AuthMenu';

import '../../scss/auth/auth.scss'

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
});

const Login: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const isAuth = useAppSelector(checkIsAuth);

    useEffect(() => {
        if (isAuth) navigate('/');
    }, [isAuth, navigate]);

    const handleSubmit = async (values: { name: string, password: string }, { setSubmitting }: FormikHelpers<{ name: string, password: string }>) => {
        try {
            await dispatch(login(values));
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);  
        }
    };

    return (
        <div>
            <AuthMenu activeItem={true} />
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
                                <ErrorMessage name="password" render={msg => <span className="error">Password is required</span>} className="error" />

                            </div>
                            <button type="submit" className={`auth__container__submit ${dirty && isValid ? 'auth__container__submit__active' : ''}`} disabled={!isValid ? true : false}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    );
};

export default Login;
