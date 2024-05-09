import { createContext } from 'react';
const ThemeContext = createContext({
    theme: ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171"],
    setTheme: () => {}
});
export default ThemeContext;