import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../Stylesheets/profile.css';
import HeaderBar from './HeaderBar';
import CreatePost from "./CreatePost";
import EditBio from "./EditBio";
import UserInfo from "./UserInfo";
import PostDisplay from "./PostsDisplay";
import Follow  from "./Follow";

function Profile(props) {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    let { id } = useParams();
    const [current, setCurrent] = useState(id);
    const [bio, setBio] = useState("");
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        setCurrent(id);
    }, [id]);

    useEffect(() => {
        fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + `/users/${current}`)
        .then((response) => response.json())
        .then((data) => {
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
                        <Follow current={current} followers={followers} updateFollow={setFollowers}></Follow>
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

export default Profile