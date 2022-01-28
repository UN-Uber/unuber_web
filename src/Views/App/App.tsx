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
import Menu from "@/Views/Menu/Menu";
import CreditCardInfo from '../creditCard/CreditCardInfo';
import Rating from '../Rating/rating';
import PrivateRoute from './ProtectedRoute';
import { selectIsLoggedIn } from '@/store';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#F30000'
    },
    secondary: {
      main: '#F3F3F3'
    },
    background: {
      paper: '#F3F3F3'
    }
  }
});


function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <ThemeProvider theme={globalTheme}>
      <BrowserRouter>
        {isLoggedIn? <Menu/> :  null}
        <Routes>
          <Route path="/login" element={isLoggedIn? <Navigate to="/home" /> : <Login />} />
          <Route path="/addUser" element={<AddClient />} />

          <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/viewData" element={<ViewData />} />
              <Route path="/editData" element={<EditData />} />
              <Route path="/addCreditCard" element={<AddCreditCard />} />
              <Route path="/wallet" element={<UserCreditCards />}/>
              <Route path="/cardDetails" element={<CreditCardInfo />}/>
              <Route path="/rating" element={<Rating />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
