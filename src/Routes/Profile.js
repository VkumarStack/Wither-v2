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
        };
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
                {chooseRender(loggedIn, theirProfile)}
                
                <div className='rowC' /* temporary, delete when chooseRender works */>
                    <div>
                        <UserInfo userinfo={{bio: "test bio"}} />
                        <EditBio></EditBio>
                    </div>
                    <div className="posts"/* TODO: GET posts based on user ID */>
                        <CreatePost></CreatePost>
                        <Post post={{id: 111, user: "joebruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "joebruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                        <Post post={{id: 111, user: "joebruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                    </div>
                </div>
            </div>
        )
    }
}

// TODO: chooseRender not displaying any page :(

function chooseRender({ loggedIn, theirProfile }) {
    const key = `${loggedIn}-${theirProfile}`
    return (
        <div>
            {{
                'false-true': null,         // can't be their profile if not logged in
                'false-false': <Page1/>,    // view only
                'true-false': <Page2/>,     // view, follow
                'true-true': <Page3/>,      // view, create post, edit bio
            }[key]}
        </div>
    )
}

function Page1() { // view only
    return (
        <div className='rowC'>
            <div>
                <UserInfo userinfo={{bio: "test bio"}} />
            </div>
            <div className="posts"/* TODO: GET posts based on user ID */>
                <Post post={{id: 111, user: "joebruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                <Post post={{id: 111, user: "joebruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                <Post post={{id: 111, user: "joebruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
            </div>
        </div>
    )
}

function Page2() { // view, follow 
    return (
        <div className='rowC'>
            <div>
                <div /* TODO: add follow button */></div>
                <UserInfo userinfo={{bio: "test bio"}} />
            </div>
            <div className="posts"/* TODO: GET posts based on user ID */>
                <Post post={{id: 111, user: "joebruin", text: "I love UCLA!", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                <Post post={{id: 111, user: "joebruin", text: "Crazy how I never miss a football game.", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
                <Post post={{id: 111, user: "joebruin", text: "I miss Josie", likes: ["John Doe", "Doe John"], dislikes: ["Traveler Trojan", "Oski Bear"]}}/>
            </div>
        </div>
    )
}

function Page3() { // view, create post, edit bio
    return (
        <div className='rowC'>
            <div>
                <UserInfo userinfo={{bio: "test bio"}} />
                <EditBio></EditBio>
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

export default Profile;