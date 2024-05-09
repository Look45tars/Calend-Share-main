import { useState, useMemo, useContext, useEffect } from 'react'
import Event from './Event'
import AddEventModal from './AddEvent';
import DateContext from './DateContext'
import ThemeContext from './ThemeContext';
import { background } from './utils';

import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import axios from 'axios';

//Creates and sets the events
function Events() {
  const [cookie, setCookie] = useCookies(['user']) 
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2024-05-08', data: 'Event 1 data', id: uuidv4() },
    // { title: 'Event 2', date: '2024-05-09', data: 'Event 2 data', id: uuidv4() },
    // { title: 'Event 3', date: '2024-05-10', data: 'Event 3 data', id: uuidv4() },
    // { title: 'Event 4', date: '2024-05-11', data: 'Event 4 data', id: uuidv4() },
    // { title: 'Event 5', date: '2024-05-12', data: 'Event 5 data', id: uuidv4() },
  ])

  useEffect(() => {
    if(cookie.user !== undefined && cookie.user !== '') {
      // Get events from database
      axios.get('http://localhost:5050/users/getEvents', {params: {username: cookie.user}})
      .then(res => {
        if(res.data.length !== 0) {
          setEvents(res.data)
        }
      })
    }  
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const dateContext = useContext(DateContext)
  const {theme} = useContext(ThemeContext)

  //Checks to see if the event date is in future or current
  function dateGEQ(date1, date2) {
    return date1.toDateString() == date2.toDateString() || date1 >= date2;
  }

  //Filters upcoming events
  const visibleEvents = useMemo(() => {
    return events.filter(event => dateGEQ(new Date(event.date), dateContext.date)).sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
  }, [events, dateContext.date])

  async function addEvent({title, date, data}) {
    const event = {title, date, data, id: uuidv4()}

    if(cookie.user !== undefined && cookie.user !== '') {
      // Add event to database
      const res = axios.post('http://localhost:5050/users/addEvent', {event , username: cookie.user})
      console.log(res)
    }

    setEvents([...events, event])
    setIsOpen(false)
  }

  function close() {
    setIsOpen(false)
  }

  function deleteEvent(uuid) {
    if(cookie.user !== undefined && cookie.user !== '') {
      // Delete event from database
      axios.delete('http://localhost:5050/users/deleteEvent', {data: {id: uuid, username: cookie.user}})
    }

    setEvents(events.filter((event) => event.id !== uuid))
  }

  function editEvent(uuid, newData) {
    if(cookie.user !== undefined && cookie.user !== '') {
      // Update event in database
      axios.put('http://localhost:5050/users/updateEvent', {id: uuid, data: newData, username: cookie.user})
    }

    setEvents(events.map((event) => {
      if(event.id === uuid) {
        return {...event, data: newData}
      }
      return event
    }))
  }

  return (
    //Displays future events
    <>
      <AddEventModal isOpen={isOpen} onSubmit={addEvent} onCancel={close} />
      <div style={background(theme[1])} className="size-full p-2">
        <div className='grid grid-flow-col justify-around'>
          <span className="text-xl font-medium">Upcoming Events</span>
          <div style={background(theme[2])} onClick={() => setIsOpen(true)} className='cursor-pointer p-2'>Add Event</div>
        </div>
        <div className='grid grid-auto-row gap-2 pt-2'>
          {visibleEvents.map((event, index) => (
            <Event key={event.id} event={event} deleteEvent={() => deleteEvent(event.id)} editEvent={(val) => editEvent(event.id, val)} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Events