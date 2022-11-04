import React from "react";
import { ReactDOM } from "react";
import '../Stylesheets/profile.css';
import Post from './Post';

class UserInfo extends React.Component {
    constructor(props) {
        // Props: User ID (to use for backend calls), User, Username, Bio
        super(props);
        this.state = {
            // Todo: add profile picture
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
        return (
            <div className="Profile">
                {/* Todo: On entering the search, display a list of Users matching the query below the search input element */}
                <input type="search" id="user-search" placeholder="Search Wither" />
                <div className='rowC' /* left column for user info, right column for posts */>
                    <div>
                        <UserInfo userinfo ={{id: 111, user: "Joe Bruin", username: "@joebruin", bio: "official mascot of UCLA | boyfriend of @josiebruin"}}/>
                    </div>
                    <div className="posts">
                        <Post post={{id: 111, user: "Joe Bruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "Joe Bruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "Joe Bruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;