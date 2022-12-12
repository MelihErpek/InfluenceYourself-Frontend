import React, { useEffect } from "react";
import axios from "axios";
import { setInf, setLoggedIn } from "./Redux/stores/UserInf"
import { useDispatch } from 'react-redux'
import Router from './Router/Router'
import './App.css';
function App() {

  let token = localStorage.getItem("a-2022-t");

  const dispatch = useDispatch();
  async function getLoggedIn() {

    const response = await axios.post("https://vercelbackenddeneme.vercel.app/loggedIn", null,
      { headers: { "x-auth-token": token } });


    dispatch(setLoggedIn(response.data))
    if (response.data) {

      const userRes = await axios.get("https://vercelbackenddeneme.vercel.app/log", {
        headers: { "x-auth-token": token },
      });


      dispatch(setInf(userRes.data.user))
    }
  }

  useEffect(() => {
    getLoggedIn();

  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;






