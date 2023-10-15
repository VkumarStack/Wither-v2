import React from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash"
import '../Stylesheets/searchbar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: []
        };
    }

    matchUsers(expression) {
        fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + `/users?pattern=${expression}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.users) {
                    this.setState({ matches: response.users.map((user) => user.a_username) });
                }
            });
            //.then(this.setState(matches: {}))
        /*
        if (this.state.users === null)
        {
            fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + '/users')
            .then((response) => response.json()) 
            .then((data) => this.setState({ users: data.users}));
            return;
        }
        if (this.state.input === null || this.state.input === "")
            return;
        let matches = []
        this.state.users.forEach(user => {
            if (user.toLowerCase().includes(expression.toLowerCase()))
                matches.push(<Link to={`/users/${user}`} key={user.toLowerCase()}> <li>{user}</li></Link> )
        })
        return (<ul>{matches}</ul>);
        */
    }

    render() {
        return (
            <div className="SearchBar">
                <input type="text" placeholder="Search Wither for a user" onChange={debounce((e) => {this.matchUsers(e.target.value)}, 250)}/>
                <ul>
                    {this.state.matches.map((username) => <Link to={`/users/${username}`} key={username.toLowerCase()}> <li> {username} </li> </Link>)}
                </ul>
            </div>
        );
    }
}

export default SearchBar;