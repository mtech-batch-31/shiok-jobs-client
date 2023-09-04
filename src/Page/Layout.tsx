// import { Fragment } from 'react';
import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import React from "react"

const Layout = () =>{
    return(
    <div id="layout">
        <Header />
        <Outlet />
    </div>)
}

export default Layout;
