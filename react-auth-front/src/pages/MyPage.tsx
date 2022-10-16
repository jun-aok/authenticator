import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const MyPage = () => {
  const auther = useAuthContext();
  // useEffect(() => {
  //   const getData = async () => {
  //     const res: any = await axios.get('https://localhost:5001/CurrentUser')
  //     setRes(new CurrentUserResponse(res.data.email, res.data.name, res.data.completed));
  //   }
  //   getData();
  // }, [])

  return (
    <div>
      <h1>マイページ</h1>
      {
        auther && 
          <>
            <h2>メールアドレス</h2>
            <p>{auther.email}</p>
            <h2>名前</h2>
            <p>{auther.name}</p>
            <h2>性別</h2>
            <p>{auther.gender}</p>
            <h2>誕生日</h2>
            <p>{auther.birthDateView}</p>
          </>
      }
    </div>
  );
};

export default MyPage;