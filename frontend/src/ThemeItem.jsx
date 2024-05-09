import { background } from "./utils"
import { useContext } from "react"
import ThemeContext from "./ThemeContext"

function ThemeItem({theme, title}) { 
  const {setTheme} = useContext(ThemeContext)

  return (
    <div className="size-48 p-2 bg-white">
      <h1 className="text-md">{title}</h1>
      {theme.map((color, index) => (
        <div key={index} style={background(color)} className="s-2">{color}</div>
      ))}
      <button onClick={() => setTheme(theme)} className="bg-slate-600 text-white mt-1 p-1">select</button>
    </div>
  )
}

export default ThemeItem