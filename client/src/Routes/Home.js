import React from "react";
import { ReactDOM } from "react";
import '../Stylesheets/home.css';
import Post from './Post';
import HeaderBar from './HeaderBar';
import CreatePost from "./CreatePost";
import PostsDisplay from "./PostsDisplay";

class Home extends React.Component {
    // Assume props is the current user
    constructor(props) {
        super(props);
        this.state = {
            following: null,
            usernames: []
        };
    }

    /*
    async componentDidMount() {
        let user = sessionStorage.getItem("user");
        if (user !== null)
        {
            let response = await fetch(`http://localhost:8080/users/${user}`);
            response = await response.json();
            if (!response.Error)
            {
                let usernames = response.a_followers;
                if (usernames.)
            }
        }
    }
    */
    render() {
        // ToDo: If user is logged in, display posts from themselves and all users that they are following
        return (
            <div className="Home">
                <HeaderBar/>
                <PostsDisplay/>
            </div>
        );
    }
}
export default Home;