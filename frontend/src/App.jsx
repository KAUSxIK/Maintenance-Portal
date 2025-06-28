import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import {AppRoutes} from './AppRoutes'; // move main logic here

function App() {
  return (
    
      <AppProvider>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
</AppProvider>

    
  );
}

export default App;

