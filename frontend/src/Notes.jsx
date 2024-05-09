import { useContext, useRef, useState } from "react"
import ThemeContext from "./ThemeContext"
import { background } from "./utils"

function Notes() { 
  const {theme} = useContext(ThemeContext)
  const noteRef = useRef() 
  const style = {
    display: 'grid',
    gap: '.25rem',
    gridTemplateRows: 'auto 1fr',
  }

  const [notes, setNotes] = useState(localStorage.getItem('notes') || '')

  function updateNotes() {
    const notes = noteRef.current.value
    localStorage.setItem('notes', notes)
  }

  return (
    <div className="size-full p-2" style={{...style, ...background(theme[1])}}>
      <p className="text-xl font-medium">Notes: </p>
      <textarea onKeyUp={updateNotes} defaultValue={notes} ref={noteRef} className="w-full h-full border-2 border-gray-300 p-2" />
    </div>
  )
}

export default Notes