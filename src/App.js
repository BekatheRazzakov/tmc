import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import SignIn from "./containers/signIn/SignIn";
import './App.css';
import UserToolbar from "./components/toolbar/UserToolbar";

function App() {
  const userToken = useAppSelector((state) => state.userState.user);

  return (
    <div className="App">
      <UserToolbar />
      <Routes>
        <Route path='*' element={userToken ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
      </Routes>
    </div>
  );
}

export default App;
