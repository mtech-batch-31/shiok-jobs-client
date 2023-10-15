import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import React from "react"

const Layout = () =>{
    return(
    <div id="layout">
        <Header />
        <Outlet />
    </div>)
}

export default Layout;
