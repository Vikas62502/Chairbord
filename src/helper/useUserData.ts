import { useState, useEffect, useCallback } from 'react';
import { getCache } from './Storage';
import { useAppSelector } from '../store/hooks';


const useUserData = () => {
  const [userData, setUserData] = useState<any>(null);
  console.log(userData, 'userData')
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    try {
      const data = await getCache('userData');
      setUserData(data);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to fetch user data');
    }
  }, []);

  useEffect(() => {
    if (!userData?.user?.id) {
      fetchUserData();
    }
  }, [fetchUserData, userData?.user?.id]);

  return {
    userData,
    userId: userData?.user?.id || null,
    error,
  };
};

export default useUserData;
