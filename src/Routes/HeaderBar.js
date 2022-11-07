import React from "react";
import '../Stylesheets/headerbar.css';
import SearchBar from './SearchBar';
import SignIn from './SignIn';

class HeaderBar extends React.Component {
    
    render() {
        return (
            <div className="HeaderBar">
                <h1><a href={window.location.origin}> Wither </a></h1>
                <SearchBar/>
                <SignIn/>
            </div>
        )
    }
}

export default HeaderBar;