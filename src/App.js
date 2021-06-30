import React, { Component } from 'react'
import Header from './components/Header/Header'
import Groceries from './components/Groceries/Groceries'
import GroceriesList from './components/Groceries/GroceriesList'

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Groceries />
        <GroceriesList />
        
      </div>
    )
  }
}

export default App

