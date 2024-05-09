import { createContext } from 'react';
const DateContext = createContext({
    date: '',
    setDate: () => {}
});
export default DateContext;