import { createContext, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Authenticator } from '../Authenticator'
import { AuthedEntity } from '../models/entities/AuthedEntity';
import { CurrentUserResponse } from '../models/responses/CurrentUserResponse';
import axios from 'axios';

const AuthContext = createContext<null | AuthedEntity>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: any }) {
  const [auther, setAuther] = useState<AuthedEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // ログイン状態を監視
    const unsubscribed = Authenticator.getAuth().onAuthStateChanged(async (user) => {
      axios.get('https://localhost:5001/api/user', { timeout: 3000 })
        .then(async res => {
          console.log(res);
          const currentUserRegistCompleted = res.data.value ? true : false;
          const auther = user == null || user.email == null ? null : new AuthedEntity(user.email, await user.getIdToken(), currentUserRegistCompleted);
          setAuther(auther);
          setLoading(false);
        }).catch(err => {
          // ここ、エラー条件によってはサーバーダウンとか知らせる必要があるかも
          setLoading(false);
          console.log(err);
        });
    });
    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return <p>loading...</p>;
  } else {
    return (
      <AuthContext.Provider value={auther}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
}

// const currentUser = Auther.getAuth().currentUser
    // if(currentUser != null) {
    //   console.log(1);
    //   // ログイン中
    //   // expireしていたらrefresh
    //   currentUser.getIdToken(true).then((idToken) => {
    //     console.log(idToken);
    //     if(idToken != Auther.getSavedToken()) {
    //       Auther.saveToken(idToken);
    //     }
    //   }).catch((errorr) => {
    //     console.log('tokenの更新失敗');
    //   })
    // }