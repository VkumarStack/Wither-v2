import React from "react";
import '../Stylesheets/home.css';
import HeaderBar from './HeaderBar';
import CreatePost from "./CreatePost";
import PostsDisplay from "./PostsDisplay";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            following: null,
            usernames: []
        };
    }

    
    componentDidMount() {
        let user = sessionStorage.getItem("user");
        if (user !== null)
        {
            fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + `/users/${user}`)
                .then(response => response.json())
                .then(response => {
                    let usernames = response.a_following;
                    usernames.push(user);
                    this.setState({ usernames: usernames });
                });
        }
    }

    render() {
        if (sessionStorage.getItem("user") === null)
            return (
                <div className="Home">
                    <HeaderBar/>
                    <PostsDisplay/>
                </div>
            );
        else
            return (
                <div className="Home">
                    <HeaderBar/>
                    <CreatePost/>
                    <PostsDisplay usernames={this.state.usernames}/>
                </div>
            );
    }
}
export default Home;