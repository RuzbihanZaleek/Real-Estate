import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

//Outlet to show the children
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
