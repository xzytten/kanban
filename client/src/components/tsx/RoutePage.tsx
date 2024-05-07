import { FC, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook';

import Layout from './Layout/Layout';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { checkIsAuth, getMe } from '../../redux/slices/AuthSlice';



const RoutePage: FC = () => {
    const [pageStatus, setPageStatus] = useState<string>('pending')

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector(checkIsAuth);
    const status = useAppSelector(state => state.auth.status)

    useEffect(() => {
        if (!isAuth) {
            if (!status) {
                dispatch(getMe());
            } else {
                setPageStatus(status);
            }
        } else {
            setPageStatus('')
        }

    }, [dispatch, status, isAuth]);

    return (
        <Router>

            {
                pageStatus === 'pending' ? (
                    <div></div>
                ) :
                    (
                        <Routes>
                            {!isAuth && <Route path="/" element={<Login />} />}
                            {isAuth && <Route path="/" element={<Layout />} />}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    )
            }
        </Router>
    );
};

export default RoutePage;