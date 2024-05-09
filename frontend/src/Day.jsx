import ThemeContext from "./ThemeContext"
import { useContext } from 'react'
import { background } from "./utils"

function Day({day, today, selectedDay, onClick}) { 
  const {theme} = useContext(ThemeContext)
  
  if (day == today)
    return <div style={background(theme[4])} className='w-16 h-16 grid place-items-center text-center cursor-pointer' onClick={onClick}>{day}</div>
  else if (day == selectedDay)
    return <div style={background(theme[3])} className='w-16 h-16 grid place-items-center text-center cursor-pointer' onClick={onClick}>{day}</div>
  else
    return <div style={background(theme[2])} className='w-16 h-16 grid place-items-center text-center cursor-pointer' onClick={onClick}>{day}</div>
}

export default Day