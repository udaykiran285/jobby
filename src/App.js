import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound' 
import './App.css';


// import Navbar from './components/Navbar'
import Login from './components/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/jobs/:id" element={<JobItemDetails/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    
  );
}

export default App;
