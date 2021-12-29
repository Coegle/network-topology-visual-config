import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainPage from './pages/Main'
import ImportPage from './pages/ImportPage'

const App = () => {
  const [file, setFile] = useState(null)
  return (
    <div style={{
       height: "100vh",
       marginTop: "-100px"
      }}>
      <Switch>
        <Route path='/topology'>
          {
            file === null
              ? <Redirect to={'/'} />
              : <MainPage file={file} setFile={setFile} />
          }
        </Route>
        <Route path='/'>
          <ImportPage setFile={setFile} file={file} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
