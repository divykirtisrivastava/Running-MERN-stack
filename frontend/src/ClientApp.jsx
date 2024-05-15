import React from 'react'
import ClientNavbar from './components/client/ClientNavbar'
import { Outlet } from 'react-router-dom'

export default function ClientApp() {
  return (
    <div>
      <ClientNavbar/>
      <Outlet/>
    </div>
  )
}
