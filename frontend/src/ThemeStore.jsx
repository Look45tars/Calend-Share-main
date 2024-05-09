import { useContext } from "react"
import ThemeContext from "./ThemeContext"
import { background } from "./utils"
import ThemeItem from "./ThemeItem"

function Store() { 
  const {theme} = useContext(ThemeContext)

  const themes = [
    ['#ff80ab', '#f06292', '#ec407a', '#c41162', '#890e4f'],
    ['#eab56f', '#e37238', '#262b59', '#253869', '#171d2c'],
    ['#ff5160 ', '#ff916c', '#fffea2', '#867278', '#694e5f'],
    ['#88deb1', '#96c7af', '#377a95', '#151f66', '#030331'],
    ["#f7fee7", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80"],
    ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171"]
  ]

  const title = [
    "Bubblegum",
    "Royal",
    "Campfire",
    "Seafoam",
    "Green",
    "Default"
  ]

  return (
    <div style={background(theme[0])} className="size-full max-w-full p-2">
      <h1 className="text-3xl">Store</h1>
      <h1 className="text-md">Buy new themes here!</h1>
      <div className="grid grid-cols-4 gap-4 w-full pt-2">
        {themes.map((theme, index) => (
          <ThemeItem key={index} theme={theme} title={title[index]}/>
        ))}
      </div>
    </div>
  )
}

export default Store