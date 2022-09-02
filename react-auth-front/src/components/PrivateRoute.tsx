import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { AuthedEntity } from '../models/entities/AuthedEntity';
const PrivateRoute: React.FC<any> = ({ component, exact, path }) => {
  const auther: AuthedEntity | null = useAuthContext();
  const location = useLocation();
  if(!auther) {
    return <Redirect to="/login" />
  }
  if(!auther.profile_completed && location.pathname != "/register_profile") {
    return <Redirect to="/register_profile" />
  }
  return ['/login', '/signup'].includes(location.pathname) ? <Redirect to="/" /> : <Route exact={exact} path={path} component={component} />
};

export default PrivateRoute;