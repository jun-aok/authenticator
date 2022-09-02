import { useEffect, useState } from 'react';
import axios from 'axios';
import { CurrentUserResponse } from '../models/responses/CurrentUserResponse';

const MyPage = () => {
  const [res, setRes] = useState<CurrentUserResponse | null>(null);
  useEffect(() => {
    const getData = async () => {
      const res: any = await axios.get('https://localhost:5001/CurrentUser')
      setRes(new CurrentUserResponse(res.data.email, res.data.name, res.data.completed));
    }
    getData();
  }, [])

  return (
    <div>
      <h1>マイページ</h1>
      {
        res && 
          <>
            <p>{res.email}</p>
            <p>{res.name}</p>
          </>
      }
    </div>
  );
};



export default MyPage;