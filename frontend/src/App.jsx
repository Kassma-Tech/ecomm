import { useState } from 'react'
import './App.css'
import TopHeader from './components/TopHeader'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import Button from './components/Button'
import Filter from './components/Filter'
import Product from './components/product'
import Home from './pages/Home'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import Login from './pages/Login'
import RequireAuth from './protected_wrappers/RequireAuth'
import PersistLogin from './protected_wrappers/PersistLogin'
import Shipping from './pages/Shipping'

function App() {

  return (
    <>
      <TopHeader />
      <Header />
      <Routes >
        <Route path='/' Component={Home} />
        <Route path='/product/:id' Component={SingleProduct} />
        <Route path='/cart' Component={Cart} />

        <Route Component={PersistLogin}>
          <Route Component={RequireAuth}>
            <Route path='/shipping' Component={Shipping} />
          </Route>
        </Route>

        <Route path='/login' Component={Login} />
      </Routes>
    </>
  )
}

export default App
