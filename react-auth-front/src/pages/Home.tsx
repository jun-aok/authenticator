// import { auth } from '../firebase';
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Authenticator } from '../Authenticator'
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const history = useHistory();
  const handleLogout = () => {
    Authenticator.signOut();
    window.location.href = '/login'
  };

  const auther = useAuthContext();

  useEffect(() => {
    console.log(auther);
  }, [])

  return (
    <div>
      <h1>ホームページ</h1>
      <h1><Link to="/mypage">マイページへ</Link></h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Home;