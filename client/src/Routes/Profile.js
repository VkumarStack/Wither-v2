import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactDOM } from "react";
import '../Stylesheets/profile.css';
import Post from './Post';
import HeaderBar from './HeaderBar';
import CreatePost from "./CreatePost";
import EditBio from "./EditBio";
import UserInfo from "./UserInfo";
import PostDisplay from "./PostsDisplay";

function Profile(props) {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    let { id } = useParams();
    const [current, setCurrent] = useState(id);
    const [bio, setBio] = useState("");
    const [followers, setFollowers] = useState(0);

    useEffect(() => {
        setCurrent(id);
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/users/${current}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (!data.Error)
            {
                setBio(data.a_bio);
                setFollowers(data.a_followers);
            }
        });
    }, [current]);

    function chooseRender(loggedIn, theirProfile) {
        const key = `${loggedIn}-${theirProfile}`
        if (key === "false-false")
        {
            return (
                <div className='rowC'>
                    <div className="userinfo-container">
                        <UserInfo bio={bio} followers={followers}/>
                    </div>
                    <PostDisplay usernames={[current]}/>
                </div>
            )
        }
        else if (key === "true-false")
        {
            return (
                <div className='rowC'>
                    <div className="userinfo-container">
                        <div></div>
                        <UserInfo bio={bio} followers={followers}/>
                    </div>
                    <PostDisplay usernames={[current]}/>
                </div>
            )
        }
        else if (key === "true-true")
        {
            return (
                <div className='rowC'>
                    <div className="userinfo-container">
                        <UserInfo bio={bio} followers={followers}/>
                        {}
                        <EditBio changeBio={setBio}/>
                    </div>
                    <div>
                        <CreatePost/>
                        <PostDisplay usernames={[current]}/>
                    </div>
                </div>
            )
        }
        else 
            return null;
    }

    let loggedIn = true;
    let theirProfile = false;
    if (sessionStorage.getItem("token") === null){
        loggedIn = false;
    } else {
        if (user === current) {
            theirProfile = true;
        }
    }
    return (
        <div className="Profile">
            <HeaderBar profile={current}/>
            {chooseRender(loggedIn, theirProfile)}
        </div>
    )
}
/*
class Profile extends React.Component {
    // Assume props is the current user
    constructor(props) {
        super(props);
        console.log("PROPS")
        console.log(this.props.match)
        this.state = {
            user: sessionStorage.getItem("user"),
            current: window.location.href.split("/").pop(),
            bio: "",
            followers: 0

            // Fetch the database at the top-level and pass into EditBio and UserInfo as props
            // userinfo contains bio, followers, posts, and username
        };
    }

    componentDidMount() {
        // fetch defaults to a GET request, so no need to specify any other parameters
        fetch(`http://localhost:8080/users/${this.state.current}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
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
                    <div className="userinfo-container">
                        <UserInfo bio={this.state.bio} followers={this.state.followers}/>
                    </div>
                    <PostDisplay usernames={[this.state.current]}/>
                </div>
            )
        }
        else if (key === "true-false")
        {
            return (
                <div className='rowC'>
                    <div className="userinfo-container">
                        <div></div>
                        <UserInfo bio={this.state.bio} followers={this.state.followers}/>
                    </div>
                    <PostDisplay usernames={[this.state.current]}/>
                </div>
            )
        }
        else if (key === "true-true")
        {
            return (
                <div className='rowC'>
                    <div className="userinfo-container">
                        <UserInfo bio={this.state.bio} followers={this.state.followers}/>
                        {}
                        <EditBio changeBio={this.changeBio.bind(this)}/>
                    </div>
                    <div>
                        <CreatePost/>
                        <PostDisplay usernames={[this.state.current]}/>
                    </div>
                </div>
            )
        }
        else 
            return null;
    }
}*/

export default Profile