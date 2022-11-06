import React from "react";
import '../Stylesheets/headerbar.css';
import SearchBar from './SearchBar';

class HeaderBar extends React.Component {
    
    render() {
        return (
            <div className="HeaderBar">
                <h1><a href={window.location.origin}> Wither </a></h1>
                <SearchBar/>
                <button> Sign-In </button>
            </div>
        )
    }
}

export default HeaderBar;