import { Route, Routes } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Auth from "./Auth/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, getUserProfile } from "./Store/Auth/Action";


function App() {
  const jwt=localStorage.getItem("jwt");
  const {auth}=useSelector(selectoer=>selectoer);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(jwt){
      dispatch(getUserProfile(jwt));
    }
  },[auth.jwt])

  useEffect(()=>{
    if(auth.user){
      dispatch(findUserById(auth.user?.id));
    }
  },[auth.user])
  

  return (
    <div>
      <Routes>
        <Route path="/*" element={auth.user?<HomePage/>:<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;
