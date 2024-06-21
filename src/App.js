import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import SignIn from "./containers/signIn/SignIn";
import './App.css';
import UserToolbar from "./components/toolbar/UserToolbar";
import { useEffect } from "react";
import Goods from "./containers/Goods/Goods";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = useAppSelector((state) => state.userState.user);
  
  useEffect(() => {
    if (!userToken) navigate('/sign-in');
  }, [navigate, userToken, location.pathname]);
  
  return (
    <div className="App">
      <UserToolbar />
      <Routes>
        <Route path='*' element={userToken ? <Navigate to="/goods" replace/> : <Navigate to="/sign-in" replace/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='goods' element={<Goods/>}/>
      </Routes>
    </div>
  );
}

export default App;
