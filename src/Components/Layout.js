import React from 'react';
import Header from '../Components/Header/Header';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const token = localStorage.getItem('token')
    const location = useLocation()
    const esconderHeader = location.pathname === '/' || location.pathname === '/cadastro'

    if(!token){
        return <Navigate to="/" replace/>
    }

    return (
        <>
        {!esconderHeader && <Header/>}
        <Outlet/>
        </>
    )
}

export default Layout;