import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Employes from './Employes';
import AddEmployes from './AddEmployes';
import UpdateEmployes from './UpdateEmployes';
import Login from './signup-in/Login'
import Signup from './signup-in/Signup';
import Forgot from './reset-password/ForgotPassword';
import Home from './Home';
import Moreinfo from './Moreinfo';
import Verifyotp from './reset-password/Verifyotp';
import Resetpassword from './reset-password/Resetpassword';
import Dashboard from './Dashboard';
import Profile from './AdminProfile';
import Department from './Department';


function App() {

  return (

    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/home' element={<Employes />}> </Route>
            <Route path='/add' element={<AddEmployes />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/home/update/:id' element={<UpdateEmployes />}></Route>
            <Route path='/home/moreinfo/:id' element={<Moreinfo />}></Route>
            <Route path='/department' element={<Department />}></Route>
          </Route>


          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/verify' element={<Verifyotp />}></Route>
          <Route path='/resetpassword' element={<Resetpassword />}></Route>
          <Route path='/forgot-password' element={<Forgot />}></Route>


        </Routes>

      </BrowserRouter>

    </div>
  );
}


export default App;