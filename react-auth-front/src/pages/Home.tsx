// import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { Authenticator } from '../Authenticator'

const Home = () => {
  const history = useHistory();
  const handleLogout = () => {
    Authenticator.getAuth().signOut()
    history.push('/login');
  };

  return (
    <div>
      <h1>ホームページ</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Home;