
import {BrowserRouter as Router , Route , Routes, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Addtask from './Components/Addtask';
import AdminsTasks from './Components/AdminsTasks';
import './index.css';
import { AuthProvider } from './Components/auth';
import { RequireAuth } from './Components/RequireAuth';






function App() {
  const user = localStorage.getItem('auth');
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register/>} />
      {user&&<Route path="/Home" element={<RequireAuth><Home /></RequireAuth>} />}
      <Route path="/addtask" element={<RequireAuth><Addtask /></RequireAuth>} />
      <Route path="/AdminsTasks" element={<RequireAuth><AdminsTasks /></RequireAuth>} />
      </Routes>

      </AuthProvider>
    
  );
}

export default App;
