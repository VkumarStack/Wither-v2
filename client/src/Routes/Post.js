import React from "react";
import Moment from "moment"
import { ReactDOM } from "react";
import "../Stylesheets/post.css"

class Post extends React.Component {
    constructor(props) {
        // Props: Post ID (to use for backend calls), User, Text Content, Number of likes, Number of Dislikes
        super(props)
        
        this.state = {
            id: this.props.post.id,
            user: this.props.post.user, 
            text: this.props.post.text,
            date: this.props.post.date,
            likes: this.props.post.likes,
            dislikes: this.props.post.dislikes,
            withered: false
        };
    }

    async likeOrDislike(like, id, user, token) {
        console.log("hit");
        if (user === null || token === null)
            return;
        let response = await fetch(`http://localhost:8080/posts/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({username: user, boolean: like})
        })
        response = await response.json();
        console.log(response);
        if (!response.Error) {
            if (response.Deleted)
            {
                this.setState({ withered: true});
                return;
            }
            this.setState({ likes: response.likes, dislikes: response.dislikes});
        }
        else if (response.Error && response.TokenError)
        {
            sessionStorage.clear();
            window.location.reload(true);
        }
    }

    render() {
        if (!this.state.withered)
            return (
                <div className="Post">
                    <a href={window.location.origin + "/users/" + this.state.user}>
                        <h2> @{this.state.user} </h2>
                    </a>
                    <p> {this.state.text} </p>
                    <div className="likes-dislikes">
                        <div className="like-info">
                            <svg 
                            onClick={(e) => {this.likeOrDislike(true, this.state.id, sessionStorage.getItem("user"), sessionStorage.getItem("token"))}}
                            className={`${this.state.likes.indexOf(sessionStorage.getItem("user")) !== -1 ? "liked" : ""}`}
                            style={{width: "24px", height: "24px"}} 
                            viewBox="0 0 24 24">
                                <path 
                                fill="currentColor" 
                                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                            </svg>
                            <h2> {this.state.likes.length}</h2>
                        </div>
                        <div className="dislike-info">
                            <svg 
                            onClick={(e) => {this.likeOrDislike(false, this.state.id, sessionStorage.getItem("user"), sessionStorage.getItem("token"))}}
                            className={`${this.state.dislikes.indexOf(sessionStorage.getItem("user")) !== -1 ? "disliked" : ""}`}
                            style={{width: "24px", height: "24px"}} 
                            viewBox="0 0 24 24">
                                <path fill="currentColor" 
                                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C8.17,3 8.82,3.12 9.44,3.33L13,9.35L9,14.35L12,21.35V21.35M16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35L11,14.35L15.5,9.35L12.85,4.27C13.87,3.47 15.17,3 16.5,3Z" />
                            </svg>
                            <h2> {this.state.dislikes.length}</h2>
                        </div>
                    </div>
                    <div className="date-container">
                        <p> { Moment(new Date(this.state.date)).fromNow() } </p>
                    </div>
                </div>
            );
        else
            return (
                <div className="Post">
                    <a href={window.location.origin + "/users/" + this.state.user}>
                        <h2> @{this.state.user} </h2>
                    </a>
                    <p className="withered"> This post has been withered. </p>
                </div>
            );
    }
}

export default Post;