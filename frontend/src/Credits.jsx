import { useContext } from "react"
import ThemeContext from "./ThemeContext"
import { background } from "./utils"
import pic from "./assets/me.png"

function Credits() { 
  const {theme} = useContext(ThemeContext)

  return (
    <div style={background(theme[0])} className="size-full max-w-full p-2">
      <h1 className="text-3xl">Credits</h1>
      <h1 className="text-md">Here are the credits!</h1>
      <p><b>Name of the course:</b> SE/ComS319 Construction of User Interfaces, Spring 2024</p>
      <p><b>Date:</b> 5/9/24</p>
      <p><b>Name and ISU Email:</b> Siyona Gorre (sgorre@iastate.edu) and Amaya Das (adas02@iastate.edu)</p>
      <p><b>Instructor:</b> Dr. Ali Jannesari</p>
      <img src={pic} alt="me" className="size-96" />
    </div>
  )
}

export default Credits