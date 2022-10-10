import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Authenticator } from '../Authenticator'
import { AuthedEntity } from '../models/entities/AuthedEntity';
import { useAuthContext } from '../context/AuthContext';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  //const authedEntity: AuthedEntity | null = useAuthContext();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    var auth_complete = await Authenticator.signUp(email.value, password.value);
    if(auth_complete) {
      setError(null);
    } else {
      setError('メールアドレスかパスワードが間違っています'); // これおかしい
    }
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      <div>
        <a href="/facebook_register">Facebookで新規登録</a>
      </div>
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
          <button>登録</button>
        </div>
      </form>
      {
        error ? <p>{error}</p> : <></>
      }
    </div>
  );
};

export default SignUp;