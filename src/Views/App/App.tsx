import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/Views/home/Home';
import Login from '@/Views/login/Login';
import AddClient from '../User/AddClient';
import ViewData from '../User/ViewData'; 
import EditData from '../User/EditData';
import AddCreditCard from '../creditCard/AddCreditCard';
import UserCreditCards from '../creditCard/ListUserCreditCards/ListUserCreditCards'
import CreditCardInfo from '../creditCard/CreditCardInfo';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addUser" element={<AddClient />} />
            <Route path="/viewData" element={<ViewData />} />
            <Route path="/editData" element={<EditData />} />
            <Route path="/addCreditCard" element={<AddCreditCard />} />
            <Route path="/wallet" element={<UserCreditCards />}/>
            <Route path="/cardDetails" element={<CreditCardInfo />}/>
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
