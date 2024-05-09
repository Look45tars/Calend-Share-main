import { useState } from 'react'
import logo from './Calend-Share_Logo.png'

import { Outlet, Link } from 'react-router-dom'

import DateContext from './DateContext'
import ThemeContext from './ThemeContext'
import { background } from './utils.js'
import { CookiesProvider, useCookies } from 'react-cookie'

function App() { 
  const [date, setDate] = useState(new Date())
  const [theme, setTheme] = useState(["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171"])
  const [cookies, setCookie] = useCookies(['user'])

  function handleLogin(user) {
    setCookie('user', user, { path: '/' })
  }

  const mainGridStyle = {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  }

  return (
    <DateContext.Provider value={{date, setDate}}>
    <ThemeContext.Provider value={{theme, setTheme}}>
    <CookiesProvider>
      <div className='h-screen w-screen'>
        <div className='size-full mx-auto' style={mainGridStyle}>
          <h1 style={background(theme[0])} className="h-16 flex">
            <img src={logo} className='my-auto ml-10 h-16 mr-auto font-bold'/>
            <Link to={"/login"} style={background(theme[2])} className='mr-10 py-2 px-2 my-auto'> 
              {cookies.user === undefined || cookies.user === '' ? "Log/Sign In" : "Account"}
            </Link>
            <Link to={"/store"} style={background(theme[2])} className='mr-10 py-2 px-2 my-auto'> 
              Themes
            </Link>
            <Link to={"/credits"} style={background(theme[2])} className='mr-10 py-2 px-2 my-auto'> 
              Credits
            </Link>
            <Link to={"/"} style={background(theme[2])} className='mr-10 py-2 px-2 my-auto'> 
              Home
            </Link>
          </h1>
          
          <div className='p-2 h-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </CookiesProvider>
    </ThemeContext.Provider>
    </DateContext.Provider>
  )
}

export default App
