import React from "react";
import { ReactDOM } from "react";
import '../Stylesheets/profile.css';
import Post from './Post';
import HeaderBar from './HeaderBar';
import CreatePost from "./CreatePost";
import EditBio from "./EditBio";
import UserInfo from "./UserInfo";

class Profile extends React.Component {
    // Assume props is the current user
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.getItem("user"),
            current: window.location.pathname.split("/").pop(),
            bio: "",
            followers: 0

            // Fetch the database at the top-level and pass into EditBio and UserInfo as props
            // userinfo contains bio, followers, posts, and username
        };
    }

    componentDidMount() {
        // fetch defaults to a GET request, so no need to specify any other parameters
        fetch(`http://localhost:8080/users/${this.state.user}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data.Error)
                this.setState({bio: data.a_bio, followers: data.a_followers});
        })
    } 

    changeBio(newBio) {
        this.setState({bio: newBio});
    }

    render() {
        let loggedIn = true;
        let theirProfile = false;
        if (sessionStorage.getItem("token") === null){
            loggedIn = false;
        } else {
            if (this.state.user === this.state.current) {
                theirProfile = true;
            }
        }
        return (
            <div className="Profile">
                <HeaderBar></HeaderBar>
                {this.chooseRender(loggedIn, theirProfile)}
            </div>
        )
    }

    chooseRender(loggedIn, theirProfile) {
        const key = `${loggedIn}-${theirProfile}`
        if (key === "false-false")
        {
            return (
                <div className='rowC'>
                    <div>
                        <UserInfo bio={this.state.bio} followers={this.state.followers}/>
                    </div>
                    <div className="posts"/* TODO: GET posts based on user ID */>
                        <Post post={{id: 111, user: "joebruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "joebruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "joebruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                    </div>
                </div>
            )
        }
        else if (key === "true-false")
        {
            return (
                <div className='rowC'>
                    <div>
                        <div /* TODO: add follow button */></div>
                        <UserInfo bio={this.state.bio} followers={this.state.followers}/>
                    </div>
                    <div className="posts"/* TODO: GET posts based on user ID */>
                        <Post post={{id: 111, user: "joebruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "joebruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "joebruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                    </div>
                </div>
            )
        }
        else if (key === "true-true")
        {
            return (
                <div className='rowC'>
                    <div>
                        <UserInfo bio={this.state.bio} followers={this.state.followers}/>
                        {/* The changeBio function is being passed to the EditBio component, but is being bound
                        to this component  (Profile) - so when changeBio() references "this" in its function, it will refer 
                        to the Profile component's state and not the Edit component's state*/}
                        <EditBio changeBio={this.changeBio.bind(this)}/>
                    </div>
                    <div className="posts"/* TODO: GET posts based on user ID */>
                        <CreatePost></CreatePost>
                        <Post post={{id: 111, user: "joebruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "joebruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "joebruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                    </div>
                </div>
            )
        }
        else 
            return null;
    }
}

export default Profile;