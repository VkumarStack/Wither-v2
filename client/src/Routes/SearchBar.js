import React from "react";
import { Link } from "react-router-dom";
import '../Stylesheets/searchbar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            input: null
        };
    }
    
    componentDidMount() {
        fetch('http://localhost:8080/users')
            .then((response) => response.json()) 
            .then((data) => this.setState({ users: data.users}));
    }

    matchUsers(expression) {
        if (this.state.users === null)
        {
            fetch('http://localhost:8080/users')
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
    }

    render() {
        return (
            <div className="SearchBar">
                <input type="text" placeholder="Search Wither for a user" onChange={(e) => {this.setState({input: e.target.value})}}/>
                {this.matchUsers(this.state.input)}
            </div>
        );
    }
}

export default SearchBar;