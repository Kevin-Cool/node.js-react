import React from "react";
import {Link} from "react-router-dom";

const Header = (props) =>{
    const userInfo = props.user;

    return (
        <div className="header">
            {userInfo == null ?  <h3 className="loginbutton"><Link to={"/Login"}> LOGIN</Link></h3> :
                <h3 className="loginbutton">{userInfo.voornaam}</h3>}
            <ul className="headerTabs">
                <li><Link to={"/Home"}> Home</Link></li>
                <li><Link to={"/Producten"}> Producten</Link></li>
                <li><Link to={"/Winkelmandje"}> Winkelmandje</Link></li>
                {userInfo !== null && <li><Link to={"/Bestellingen"}> Bestellingen</Link></li>}
            </ul>
        </div>
    );
}
export default Header;