import {Navigate, Outlet} from 'react-router-dom';
import { checkIfExpired, logout } from '../../features/authSlice'
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectIsLoggedIn,  } from '@/store';

function PrivateRoute ()  {

    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn){
        if(checkIfExpired(token||"")){
            dispatch(logout());
            return <Navigate to="/login" />
        }
        return <Outlet />
    }
    return <Navigate to="/login" />
}
    

export default PrivateRoute;