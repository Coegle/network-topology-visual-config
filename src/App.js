import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainPage from './pages/Main'

const App = () => {
  return (
    <>
      <Switch>
        <Route path='/'>
          <MainPage />
        </Route>
      </Switch>
    </>
  )
}

export default App
