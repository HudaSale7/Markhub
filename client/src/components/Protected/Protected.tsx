import { Outlet } from 'react-router-dom';
import Login from '../Login/Login';

const Protected = () => {
  return localStorage.getItem('token') ? <Outlet /> : <Login />;
};

export default Protected;
