import React from "react";
import { ReactDOM } from "react";
import '../Stylesheets/home.css';
import Post from './Post';
import HeaderBar from './HeaderBar';
import CreatePost from "./CreatePost";



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
                    {/* Todo: On entering the search, display a list of Users matching the query below the search input element*/}
                    <HeaderBar/>
                    <div className="posts">
                        <Post post=/* TODO GET posts of followed users */{{id: 123, user: "Vivek Kumar", text: "Test text", likes: ["John Doe", "Doe John"], dislikes: ["Smith Smithereens", "Davy Jones"]}}/>
                    </div>
                </div>
            );
        else 
            return (
                <div className="Home">
                {/* Todo: On entering the search, display a list of Users matching the query below the search input element*/}
                <HeaderBar/>
                <div className="posts">
                    <CreatePost></CreatePost>
                    <Post post=/* TODO GET posts of followed users */{{id: 123, user: "Vivek Kumar", text: "Test text", likes: ["John Doe", "Doe John"], dislikes: ["Smith Smithereens", "Davy Jones"]}}/>
                </div>
            </div>
        )
    }
}
export default Home;