import Calendar from './Calendar'
import Events from './Events'
import Notes from './Notes'

import { useContext } from 'react'
import ThemeContext from './ThemeContext'

function MainPage() { 
  const {theme} = useContext(ThemeContext)

  const bodyGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 1000px) minmax(auto, 400px)',
    gap: '1rem',	
  }
  
  const leftGridStyle = {
    display: 'grid',
    gridTemplateRows: '3fr 1fr',
    gap: '1rem',
  }
  
  return (
    <div className='h-full' style={bodyGridStyle}>
      <div style={leftGridStyle}>
        <Calendar />
        <Notes />
      </div>
      <Events />
    </div>
  )
}

export default MainPage