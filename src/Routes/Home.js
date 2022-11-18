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
            following: null 
        };
    }

    render() {
        if (sessionStorage.getItem("token") === null)
            return (
                <div className="Home">
                    <HeaderBar/>
                    <div className="posts">
                        <Post post=/* TODO GET posts of all users */{{id: 123, user: "Welcome", text: "Join Wither to get your own personalized timeline!", likes: [1,1,1,1,1,1,1,1,1,1,1], dislikes: []}}/>
                        <PostsDisplay></PostsDisplay> 
                    </div>
                </div>
            );
        else 
            return (
                <div className="Home">
                <HeaderBar/>
                <div className="posts">
                    <CreatePost></CreatePost>
                    <PostsDisplay></PostsDisplay> 
                </div>
            </div>
        )
    }
}
export default Home;