import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import AddClient from '../User/AddClient';
import ViewData from '../User/ViewData';
import EditData from '../User/EditData';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addUser" element={<AddClient />} />
            <Route path="/viewData" element={<ViewData />} />
            <Route path="/editData" element={<EditData />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
