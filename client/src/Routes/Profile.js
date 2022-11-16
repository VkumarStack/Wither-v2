import React from "react";
import { ReactDOM } from "react";
import '../Stylesheets/profile.css';
import Post from './Post';
import HeaderBar from './HeaderBar';
import CreatePost from "./CreatePost";

class UserInfo extends React.Component {
    constructor(props) {
        // Props: User ID (to use for backend calls), User, Username, Bio
        super(props);
        this.state = {
            id: this.props.userinfo.id,
            user: this.props.userinfo.user, 
            username: this.props.userinfo.username,
            bio: this.props.userinfo.bio,
        };
    }
    
    render() {
        return (
            <div className="UserInfo">
                <h1> {this.state.user} </h1>
                <h2> {this.state.username} </h2>
                <h2></h2>
                <p> {this.state.bio} </p>
            </div>
        );
    }
}

class Profile extends React.Component {
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
                <div className="Profile">
                    <HeaderBar></HeaderBar>
                    <div className='rowC' /* left column for user info, right column for posts */>
                        <div>
                            <UserInfo userinfo = /* TODO GET info based on user ID */ {{id: 111, user: "Joe Bruin", username: "@joebruin", bio: "official mascot of UCLA | boyfriend of @josiebruin"}}/>
                        </div>
                        <div className="posts">
                            <Post post=/* TODO GET posts based on user ID */{{id: 111, user: "Joe Bruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                            <Post post={{id: 111, user: "Joe Bruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                            <Post post={{id: 111, user: "Joe Bruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div className="Profile">
                    <HeaderBar></HeaderBar>
                    <div className='rowC' /* left column for user info, right column for posts */>
                        <div>
                            <UserInfo userinfo = /* TODO GET info based on user ID */ {{id: 111, user: "Joe Bruin", username: "@joebruin", bio: "official mascot of UCLA | boyfriend of @josiebruin"}}/>
                        </div>
                        <div className="posts">
                            <CreatePost></CreatePost>
                            <Post post=/* TODO GET posts based on user ID */{{id: 111, user: "Joe Bruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                            <Post post={{id: 111, user: "Joe Bruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                            <Post post={{id: 111, user: "Joe Bruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        </div>
                    </div>
                </div>
            )
    }
}

export default Profile;