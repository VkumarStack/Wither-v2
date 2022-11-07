import React from "react";
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
            .then((data) => this.setState({ users: data.userlist}));
    }

    matchUsers(expression) {
        if (this.state.users === null)
        {
            fetch('http://localhost:8080/users')
            .then((response) => response.json()) 
            .then((data) => this.setState({ users: data.userlist}));
            return;
        }
        if (this.state.input === null)
            return;
        let matches = []
        this.state.users.forEach(user => {
            if (user.toLowerCase().includes(expression.toLowerCase()))
                matches.push(<a key={user.toLowerCase()} href={window.location.origin + "/users/" + user}><li>{user}</li></a>)
        })
        return (<ul>{matches}</ul>);
    }

    render() {
        return (
            <div className="SearchBar">
                <input type="text" placeholder="Search Wither for a user" onChange={(e) => this.setState({input: e.target.value})}/>
                {this.matchUsers(this.state.input)}
            </div>
        );
    }
}

export default SearchBar;