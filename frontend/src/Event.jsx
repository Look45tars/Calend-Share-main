import { useContext } from "react"
import ThemeContext from "./ThemeContext"
import { background } from "./utils"

function Event({event, deleteEvent, editEvent}) { 
  const {title, date, data} = event
  const {theme} = useContext(ThemeContext)
  
  function edit() {
    const res = prompt('Enter the new description you want')
    editEvent(res)
  }

  return (
    <div style={background(theme[2])} className="size-full p-2">
      <h1 className="text-md">{title}: {new Date(date).toDateString()}</h1>
      <h1 className="text-sm">{data}</h1>
      <div style={background(theme[3])} onClick={deleteEvent} className='cursor-pointer w-24 float-end text-center text-sm p-2'>Delete Event</div>
      <div style={background(theme[3])} onClick={edit} className='cursor-pointer w-24 float-end text-center text-sm p-2 mr-2'>Edit Event</div>
    </div>
  )
}

export default Event