import { createContext, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Authenticator } from '../Authenticator'
import { AuthedEntity } from '../models/entities/AuthedEntity';
import moment from 'moment';
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
      let token = Authenticator.getToken()
      // ログインしていない
      if(!user || token == null) {
        setLoading(false);
        return
      }
      axios.get('http://localhost:1323/user', { timeout: 3000 })
        .then(async res => {
          const currentUserRegistCompleted = res.data.user ? true : false;
          const auther = new AuthedEntity(
            user.email!, 
            await user.getIdToken(), 
            currentUserRegistCompleted
          );
          if (currentUserRegistCompleted) {
            auther.name = res.data.user.Name;
            auther.gender = res.data.user.Gender;
            auther.birthDate = moment(res.data.user.BirthDate)
          }
          setAuther(auther);
          setLoading(false);
        }).catch(err => {
          if (err.response.status == 400) {
            // トークンの期限切れ
            Authenticator.signOut()
          } 
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