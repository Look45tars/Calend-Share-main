import { useState, useEffect, useContext } from 'react'
import Day from './Day'
import DateContext from './DateContext'
import ThemeContext from './ThemeContext'
import { background } from './utils.js'

//Displays the calendar and makes it functional
function Calendar() {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const dateContext = useContext(DateContext)
  const {theme} = useContext(ThemeContext)
  
  const today = new Date()
  const [todayDay, setTodayDay] = useState(today.getDate())

  const [currentDate, setCurrentDate] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentDay, setCurrentDay] = useState(today.getDate())

  const [daySpacers, setDaySpacers] = useState(today.getDay())

  useEffect(() => {
    const month = currentDate.getMonth()
    setCurrentMonth(month)  

    const year = currentDate.getFullYear()
    setCurrentYear(year)
  }, [currentDate])

  useEffect(() => {
    if(today.getMonth() == currentMonth)
      setTodayDay(today.getDate())
    else 
      setTodayDay(-1)

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    setDaySpacers(firstDay.getDay())
  }, [currentMonth])

  useEffect(() => {
    dateContext.setDate(currentDate)
  }, [currentDate])

  //Changes the month displayed on the calendar to the next month
  function nextMonth() {
    const nextMonth = new Date(currentDate)
    nextMonth.setMonth(currentMonth + 1)
    
    if(currentMonth === 11) {
      nextMonth.setFullYear(currentDate.getFullYear() + 1)
      nextMonth.setMonth(0)
    }

    setCurrentDate(nextMonth)
  }

  //Changes the month displayed on the calendar to the previous month
  function prevMonth() {
    const prevMonth = new Date(currentDate)
    prevMonth.setMonth(currentMonth - 1)

    if(currentMonth === 0) {
      prevMonth.setFullYear(currentDate.getFullYear() - 1)
      prevMonth.setMonth(11)
    }

    setCurrentDate(prevMonth)
  }

  //Sets the current day
  function setDay(index) {
    setCurrentDay(index)
    
    const prevDay = new Date(currentDate)
    prevDay.setDate(index)
    setCurrentDate(prevDay)
  }

  return (
    <div style={background(theme[1])} className="size-full p-2">
      <p className="text-xl font-medium">Personal Calendar</p>
      <div className='grid grid-cols-3 w-96 place-items-center mx-auto'>
        <div style={background(theme[2])} onClick={prevMonth} className='cursor-pointer p-2'>Prev</div>
        <div className='mx-auto w-32 text-center font-medium'>{months[currentMonth]} {currentYear}</div>
        <div style={background(theme[2])} onClick={nextMonth} className='cursor-pointer  p-2'>Next</div>
      </div>

      <div className="mx-auto mt-6 grid grid-cols-7 gap-2 w-[28rem] ">  
        {days.map((day, index) => {
          return <div style={background(theme[2])} className='w-16 h-16 grid place-items-center' key={index}>{day}</div>
        })}

        {Array.from({length: daySpacers}).map((_, index) => {
          return <div style={background(theme[1])} className='w-16 h-16' key={index}></div>
        })}

        {Array.from({length: 30}, (_, i) => i + 1).map((day, index) => {
          return <Day day={day} today={todayDay} key={index} selectedDay={currentDay} onClick={() => setDay(day)}/>
        })}
      </div>
    </div>
  )
}

export default Calendar