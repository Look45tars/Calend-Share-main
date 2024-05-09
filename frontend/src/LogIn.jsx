import { useContext } from "react"
import ThemeContext from "./ThemeContext"
import { background } from "./utils"
import { useCookies } from "react-cookie"
import axios from "axios"

function LogIn() { 
  const {theme} = useContext(ThemeContext)
  const [cookie, setCookie] = useCookies(['user'])


  async function login() {

    const username = document.querySelector('input[placeholder="Username"]').value
    const password = document.querySelector('input[placeholder="Password"]').value

    // check if username and password are correct
    const res = await axios.post('http://localhost:5050/users/login', {username, password})
    if(res.data.length === 0) {
      alert('Incorrect username or password')
      return
    }

    setCookie('user', username, { path: '/' })
  }

  async function signup() {
    let username = document.querySelector('input[placeholder="New Username"]').value
    let password = document.querySelector('input[placeholder="New Password"]').value

    // check if username is taken
    let res
    res = await axios.post('http://localhost:5050/users/', {username})
    if (res.data.length !== 0) {
      alert('Username already taken')
      return
    }

    // create new user
    res = await axios.post('http://localhost:5050/users/signup', {username, password})
    if (res.status !== 200) {
      alert('Error creating user')
      return
    }

    setCookie('user', username, { path: '/' })
  }

  function logout() {
    setCookie('user', '', { path: '/' })
  }

  function isLoggedIn() {
    return cookie.user !== undefined && cookie.user !== ''
  }

  return isLoggedIn() ? (
    <div style={background(theme[0])} className="size-full max-w-full p-2">
      <h1 className="text-3xl">Welcome {cookie.user}!</h1>
      <button onClick={logout} className="bg-slate-600 text-white mt-1 p-1">Log Out</button>
    </div>
  ) : (
    <div style={background(theme[0])} className="size-full max-w-full p-2">
      <h1 className="text-3xl">Log In or Sign Up!</h1>
      <div className="grid grid-cols-2 gap-3 pt-4">
        <div style={background(theme[1])} className="p-4">
          <h1 className="text-xl">Log In!</h1>
          <input className="w-full p-2 border-2 border-gray-300" placeholder="Username" />
          <input className="w-full p-2 border-2 border-gray-300" placeholder="Password" />
          <button onClick={login} className="bg-slate-600 text-white mt-1 p-1">Log In</button>
        </div>
        <div style={background(theme[1])} className="p-4 ">
          <h1 className="text-xl">Sign Up!</h1>
          <input className="w-full p-2 border-2 border-gray-300" placeholder="New Username" />
          <input className="w-full p-2 border-2 border-gray-300" placeholder="New Password" />
          <button onClick={signup} className="bg-slate-600 text-white mt-1 p-1">Sign Up!</button>
        </div>
      </div>
    </div>
  )
}

export default LogIn