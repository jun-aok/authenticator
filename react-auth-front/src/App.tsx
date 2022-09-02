import Home from './pages/Home';
import MyPage from './pages/MyPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import RegisterProfile from './pages/RegisterProfile';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import {} from './axios-middleware';
import {} from './Authenticator';

function App() {
  return (
    <AuthProvider>
      <div style={{ margin: '2em' }}>
        <BrowserRouter>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/mypage" component={MyPage} />
          <PrivateRoute exact path="/register_profile" component={RegisterProfile} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;