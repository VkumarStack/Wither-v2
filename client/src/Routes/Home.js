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

    
    async componentDidMount() {
        let user = sessionStorage.getItem("user");
        if (user !== null)
        {
            let response = await fetch(`https://wither.onrender.com/users/${user}`);
            response = await response.json();
            console.log(response);
            if (!response.Error)
            {
                let usernames = response.a_following;
                usernames.push(user);
                this.setState({ usernames: usernames});
            }
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