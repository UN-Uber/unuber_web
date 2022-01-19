import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/Views/home/Home';
import Login from '@/Views/login/Login';
import AddClient from '../User/AddClient';
import ViewData from '../User/ViewData'; 
import EditData from '../User/EditData';
import AddCreditCard from '../creditCard/AddCreditCard';
import UserCreditCards from '../creditCard/ListUserCreditCards/ListUserCreditCards'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Maps from '../Maps/Maps';
import CreditCardInfo from '../creditCard/CreditCardInfo';
import Rating from '../Rating/rating';


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
            <Route path="/maps" element={<Maps/>} />
            <Route path="/cardDetails" element={<CreditCardInfo />}/>
            <Route path="/rating" element={<Rating />} /> 
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
