import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BookingPage from './components/BookingPage';
import ComplaintsPage from './components/ComplaintsPage';
import AdminPanel from './components/AdminPanel';
import Signup from './components/SignupPage';
import { useApp } from './context/AppContext';


  

function App() {
  const{user}=useApp();
  return (
    <AppProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Dashboard/>}/>
      <Route path='/bookings'  element={<BookingPage/>}/>
      <Route path='/complaints'  element={<ComplaintsPage/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
       <Route
            path="/admin"
            element={
              user && user.isAdmin ? <AdminPanel /> : <Navigate to="/login" />
            }
          />
      

    </Routes>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
