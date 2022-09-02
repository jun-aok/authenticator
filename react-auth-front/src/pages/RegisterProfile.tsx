//import { auth } from '../firebase';
import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Authenticator } from '../Authenticator'
import { useAuthContext } from '../context/AuthContext';
import { AuthedEntity } from '../models/entities/AuthedEntity';


// ユーザー情報未登録時に表示するページ
const RegisterProfile = () => {
  const [error, setError] = useState<string | null>(null);
  const authedEntity: AuthedEntity | null = useAuthContext();
  useEffect(() => {
    console.log(1);
  }, [])

  return (
    <div>
      ユーザー情報登録ページ
    </div>
  );
};

export default RegisterProfile;