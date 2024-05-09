import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MainPage from './MainPage.jsx'
import Store from './ThemeStore.jsx'
import Credits from './Credits.jsx'
import LogIn from './LogIn.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<MainPage />} />
          <Route path='store' element={<Store />} />
          <Route path='credits' element={<Credits />} />
          <Route path='login' element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
