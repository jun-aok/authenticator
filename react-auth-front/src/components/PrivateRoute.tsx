import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { AuthedEntity } from '../models/entities/AuthedEntity';
const PrivateRoute: React.FC<any> = ({ component, exact, path }) => {
  const auther = useAuthContext();
  const location = useLocation();
  if(!auther) {
    return <Redirect to="/login" />
  }
  // ログインはしているがプロファイル未登録
  if(!auther.profileCompleted && location.pathname != "/register_profile") {
    return <Redirect to="/register_profile" />
  }
  // プロファイル登録済みで/register_profileにアクセスしようとした
  if(auther.profileCompleted && location.pathname == "/register_profile") {
    return <Redirect to="/" />
  }
  return ['/login', '/signup'].includes(location.pathname) ? <Redirect to="/" /> : <Route exact={exact} path={path} component={component} />
};

export default PrivateRoute;