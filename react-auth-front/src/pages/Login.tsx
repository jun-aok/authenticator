//import { auth } from '../firebase';
import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Authenticator } from '../Authenticator'
//import { useDark } from '../context/AuthContext';
import { AuthedEntity } from '../models/entities/AuthedEntity';


const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // const auther: AuthedEntity | null = useAuthContext();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    // サインインすればAuthContextのオブサーバーが動く
    // トークンがなくなっていたら強制的にサインアウトする
    // これをしないとIndexedDBを消さないと動かなくなる
    Authenticator.signOut()
    var auth_complete = await Authenticator.signIn(email.value, password.value);
    if(auth_complete) {
      // スマートじゃないけど<Redirect>だとAuthContextがそのままで正しく動かせない
      // ログイン時にContextの値を更新できれば良いがやり方がいまいちわからず
      window.location.href = '/'
    } else {
      setError('メールアドレスかパスワードが間違っています');
    }
  };

  const handleFacebookLogin = async () => {
    const provider = Authenticator.signInFacebook();
    console.log(Authenticator.getAuth().currentUser);
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button>ログイン</button>
        </div>
        {
          error &&
          <div>
            { error }
          </div>
        }
        <div>
          ユーザ登録は<Link to={'/signup'}>こちら</Link>から
        </div>
        <div>
          <a onClick={handleFacebookLogin} >Facebookログイン</a>
        </div>
      </form>
      {
        error ? <p>{error}</p> : <></>
      }
    </div>
  );
};

export default Login;