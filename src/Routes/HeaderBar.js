import React from "react";
import '../Stylesheets/headerbar.css';
import Register from "./Register";
import SearchBar from './SearchBar';
import SignIn from './SignIn';
import CreatePost from "./CreatePost";

class HeaderBar extends React.Component {
    render() {
        console.log(GetUserUrl())
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
                    { (GetUserUrl() !== sessionStorage.getItem("user")) && 
                        <YourProfile/>
                    }
                    <Logout/>
                </div>
            )
    }
}

function GetUserUrl() {
    let path = window.location.pathname.split("/");
    if(path.length > 2)
        return path[2] // First element in array is empty string, then "users", and then third should be the username
    else
        return null
}


function YourProfile(props) {
    let user = sessionStorage.getItem("user")
    return (
        <div className="YourProfile">
            <div className="profile-button"
            onClick={() => {
                window.location.replace(`/users/${user}`);
            }}>
                Profile       
            </div>
        </div>
    );
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