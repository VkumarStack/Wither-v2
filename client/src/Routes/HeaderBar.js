import React from "react";
import '../Stylesheets/headerbar.css';
import Register from "./Register";
import SearchBar from './SearchBar';
import SignIn from './SignIn';

class HeaderBar extends React.Component {
    
    render() {
        if (sessionStorage.getItem("token") === null)
            return (
                <div className="HeaderBar">
                    <h1><a href={window.location.origin}> Wither </a></h1>
                    <SearchBar/>
                    <SignIn/>
                    <Register/>
                </div>
            );
        else 
            return (
                <div className="HeaderBar">
                    <h1><a href={window.location.origin}> Wither </a></h1>
                    <SearchBar/>
                    <Logout/>
                </div>
            )
    }
}

function Logout(props) {
    return (
        <div className="Logout">
            <div className="logout-button"
            onClick={() => {
                sessionStorage.clear();
                window.location.reload(true);
            }}>
                Logout       
            </div>
        </div>
    );
}

export default HeaderBar;