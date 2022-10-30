import React from "react";
import { ReactDOM } from "react";
import '../Stylesheets/home.css';
import Post from './Post';


class Home extends React.Component {
    // Assume props is the current user
    constructor(props) {
        super(props);
        this.state = {
            following: null 
        };
    }
    render() {
        return (
            <div className="Home">
                {/* Todo: On entering the search, display a list of Users matching the query below the search input element*/}
                <input type="search" id="user-search" placeholder="Search Wither" />
                <div className="posts">
                    <Post post={{id: 123, user: "Vivek Kumar", text: "Test text", likes: ["John Doe", "Doe John"], dislikes: ["Smith Smithereens", "Davy Jones"]}}/>
                </div>
            </div>
        );
    }
}

export default Home;