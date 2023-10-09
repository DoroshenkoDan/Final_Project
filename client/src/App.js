import React from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import Store from './Redux/store.js'

function App() {
  return (
    <Store>
      <Router></Router>
    </Store>
  )
}

export default App
