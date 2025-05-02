import React from 'react'
import Navbar from '../components/client/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/client/footer/Footer'

const MainLayout: React.FC = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default MainLayout
