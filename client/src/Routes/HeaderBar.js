import React from "react";
import '../Stylesheets/headerbar.css';
import Register from "./Register";
import SearchBar from './SearchBar';
import SignIn from './SignIn';
import CreatePost from "./CreatePost";

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
                    <YourProfile/>
                    <Logout/>
                </div>
            )
    }
}

// TODO: hide profile button when user is on their profile page
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