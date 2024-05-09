import { useContext } from "react"
import ThemeContext from "./ThemeContext"
import { background } from "./utils"

function AddEventModal({isOpen, onSubmit, onCancel}) { 
  const {theme} = useContext(ThemeContext)
  
  const outerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateArea: '1fr auto 1fr',
  }

  const innerStyle = {
    gridArea: '2/2/2/2',
  }

  function submit() {
    const title = document.getElementById('title').value
    const date = document.getElementById('date').value
    const data = document.getElementById('data').value

    // If there is no title or date, do not submit
    if(date === '' || title === '') {
      return
    }

    onSubmit({title, date, data})
  }

  return (
    isOpen && <div className="size-full bg-[#00000034] p-2 absolute top-0 left-0 z-10 grid" style={outerStyle}>
      <div style={{...innerStyle, ...background(theme[2])}} className='w-96 h-80 p-4 grid gap-2'>
        <p>Title</p>
        <input id='title' />
        <p>Description</p>
        <input id='data' />
        <p>Date</p>
        <input type='date' id='date' />
        <div style={background(theme[3])} onClick={submit} className='cursor-pointer w-24 float-end text-center text-sm p-2'>Add Event</div>
        <div style={background(theme[3])} onClick={onCancel} className='cursor-pointer w-24 float-end text-center text-sm p-2'>Cancel</div>
      </div>
    </div>
  )
}

export default AddEventModal