import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import SignIn from "./containers/signIn/SignIn";
import UserToolbar from "./components/toolbar/UserToolbar";
import { useEffect } from "react";
import Goods from "./containers/Goods/Goods";
import SingleGood from "./containers/SingleGood/SingleGood";
import './App.css';
import NewGood from "./containers/NewGood/NewGood";
import Trades from "./containers/Trades/Trades";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.userState.user);
  
  useEffect(() => {
    if (!user) navigate('/sign-in');
  }, [navigate, user, location.pathname]);
  
  return (
    <div className='App'>
      <UserToolbar/>
      <Routes>
        <Route path='*'
          element={user ? <Navigate to='/goods' replace/> :
            <Navigate to='/sign-in' replace/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='goods' element={<Goods/>}/>
        <Route path='goods/:id' element={<SingleGood/>}/>
        <Route path='create-good' element={<NewGood/>}/>
        <Route path='trades' element={<Trades/>}/>
      </Routes>
    </div>
  );
}

export default App;
