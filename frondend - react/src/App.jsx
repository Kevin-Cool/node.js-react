import React,{useEffect,useState} from "react"
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import axios from "axios"
import './App.css';
import  Header from "./components/Parts/Header"
import  Footer from "./components/Parts/Footer"
import  Home from "./components/Pages/Home"
import  Bestellingen from "./components/Pages/Bestellingen"
import  Producten from "./components/Pages/Producten"
import  Winkelmandje from "./components/Pages/Winkelmandje"
import  WrongRequest from "./components/Pages/WrongRequest"
import  Login from "./components/Pages/Login"

function App() {
    const [apiProducts,setApiProducts] = useState(null);
    const [WinkelMandje,setWinkelMandje] = useState([]);
    const [UserData,setUserData] = useState(null);


    useEffect( () =>{
        axios.get("http://localhost:3000/product",  { crossdomain: true }).then(response => {
            setApiProducts(response.data);
            console.log(response.data);
        });
    }, [])

  return (
    <div className="App">
          <Router>
              <Header  user={UserData}/>
              <div className="inner">
              <Switch>
                  <Route path={"/Winkelmandje"}>
                      <Winkelmandje mandje={WinkelMandje}  setwinkel={setWinkelMandje} producten={apiProducts} user={UserData}></Winkelmandje>
                  </Route>

                  <Route path={"/Producten"}>
                      <Producten producten={apiProducts} setwinkel={setWinkelMandje} mandje={WinkelMandje}></Producten>
                  </Route>

                  <Route path={"/Bestellingen"}>
                      <Bestellingen user={UserData}></Bestellingen>
                  </Route>

                  <Route path={"/Login"}>
                      <Login user={UserData} setuser={setUserData}></Login>
                  </Route>

                  <Route path={"/"}>
                      <Home/>
                  </Route>

                  <Route path={"*"}>
                      <WrongRequest></WrongRequest>
                  </Route>

              </Switch>
              </div>
              <Footer/>
          </Router>
    </div>
  );
}

export default App;
