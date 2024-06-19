import React, { useEffect } from 'react';
import { setCurrentPage } from "../../features/dataSlice";
import { useAppDispatch } from "../../app/hooks";
import './home.css';

const Home = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setCurrentPage('Логин'))
  }, [dispatch]);
  
  return (
    <div>
    </div>
  );
};

export default Home;