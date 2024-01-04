import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div>
      <NavbarComponent/>
        <Outlet />
    </div>
  )
}

export default HomeLayout