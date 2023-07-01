import { useState } from 'react'
import './App.css'
import TopHeader from './components/TopHeader'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import Button from './components/Button'
import Filter from './components/Filter'
import Home from './pages/Home'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import Login from './pages/Login'
import RequireAuth from './protected_wrappers/RequireAuth'
import PersistLogin from './protected_wrappers/PersistLogin'
import Shipping from './pages/Shipping'
import CheckOut from './pages/Checkout'
import Thankyou from './pages/Thankyou'
import Register from './pages/Register'
import PurchaseHistory from './pages/PurchaseHistory'
import Product from './pages/Product'

function App() {

  return (
    <>
      <TopHeader />
      <Header />
      <Routes >

        <Route Component={PersistLogin}>
          <Route path='/' Component={Home} />
          <Route path='/product/:id' Component={SingleProduct} />
          <Route path='/cart' Component={Cart} />
          <Route path='/test' Component={Product} />

          <Route Component={RequireAuth}>
            <Route path='/shipping' Component={Shipping} />
            <Route path='/checkout' Component={CheckOut} />
            <Route path='/thanks' Component={Thankyou} />
            <Route path='/purchase-history' Component={PurchaseHistory} />
          </Route>
        </Route>

        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
      </Routes>
    </>
  )
}

export default App
