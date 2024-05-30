import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Table from './components/Table.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Form from './components/Form.jsx'
import UpdateProduct from './components/UpdateProduct.jsx'
import ViewData from './components/ViewData.jsx'
import ClientApp from './ClientApp.jsx'
import Home from './components/client/Home.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import Protected from './components/Protected.jsx'
import Cart from './components/client/Cart.jsx'
import UserLogin from './components/client/UserLogin.jsx'
import UserSignUp from './components/client/UserSignUp.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
   <>
  <Route path='/' element={<ClientApp/>}>
    <Route path='' element={<Home/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/userLogin' element={<UserLogin/>}/>
    <Route path='/userSignup' element={<UserSignUp/>}/>
  </Route>


    <Route path='/admin' element={<App/>}>
      <Route path='' element={
        <Protected>
          <Table/>
        </Protected>
      }/>
      <Route path='/admin/form' element={
        <Protected>
          <Form/>
        </Protected>
      }/>
      <Route path='/admin/adminLogin' element={<AdminLogin/>}/>
      <Route path='/admin/view/:id' element={<ViewData/>}/>
      <Route path='/admin/update/:id' element={<UpdateProduct/>}/>
    </Route>
   </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
