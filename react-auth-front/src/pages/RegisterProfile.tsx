//import { auth } from '../firebase';
import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Authenticator } from '../Authenticator'
import { useAuthContext } from '../context/AuthContext';
import { AuthedEntity } from '../models/entities/AuthedEntity';
import axios from 'axios';


// ユーザー情報未登録時に表示するページ
const RegisterProfile = () => {
  const [error, setError] = useState<string | null>(null);
  // const authedEntity: AuthedEntity | null = useAuthContext();
  

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { name, birthDate, gender } = event.target.elements;  
    // サインインすればAuthContextのオブサーバーが動く
    const params = new URLSearchParams();
    params.append("name",name.value);
    params.append("birthDate",birthDate.value);
    params.append("gender",gender.value);
    axios.post('http://localhost:1323/user', params).then(_ => {
      window.location.href = '/'
    }).catch(response => {
      console.log(response)
    })
  };

  return (
    <div>
      <p>
        ユーザー情報登録ページ
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前</label>
          <input name="name" type="text" placeholder="名前" />
        </div>
        <div>
          <label>誕生日</label>
          <input name="birthDate" type="text" placeholder="2022-01-01" />
        </div>
        <div>
          <label>性別</label>
          <select name="gender">
            <option value="1">男</option>
            <option value="2">女</option>
            <option value="3">無回答</option>
          </select>
        </div>
        <div>
          <button>登録する</button>
        </div>
        {
          error &&
          <div>
            { error }
          </div>
        }
      </form>
    </div>
    
  );
};

export default RegisterProfile;