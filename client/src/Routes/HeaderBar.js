import React from "react";
import '../Stylesheets/headerbar.css';
import SearchBar from './SearchBar';
import SignIn from './SignIn';
import CreatePost from "./CreatePost";

class HeaderBar extends React.Component {
    
    render() {
        return (
            <div className="HeaderBar">
                <h1><a href={window.location.origin}> Wither </a></h1>
                <SearchBar/>
                <CreatePost/>
                <SignIn/>
            </div>
        )
    }
}

export default HeaderBar;