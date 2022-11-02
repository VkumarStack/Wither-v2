import React from "react";
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
            likes: this.props.post.likes,
            dislikes: this.props.post.dislikes
        };
    }

    // ToDo: This method should like or dislike (according to the first argument, a boolean) and then make a request to the backend 
    // to update the post with ID to be liked by user. The user is NOT the post owner, it is any user viewing and making changes to the 
    // post. This will likely require getting an authentication token so that it can be used ot verify the user's identity. The backend 
    // call should return the entire post object again (or if it has been deleted, some sort of indicator of so) so that the state can be 
    // updated and the component re-rendered
    likeOrDislike(like, id, user) {
        console.log("TO BE IMPLEMENTED")
    }

    render() {
        return (
            <div className="Post">
                <a href={window.location.origin + "/users/" + this.state.user}>
                    <h1> {this.state.user} </h1>
                </a>
                <p> {this.state.text} </p>
                <div className="likes-dislikes">
                    <div className="like-info">
                        <svg 
                        style={{width: "24px", height: "24px"}} 
                        viewBox="0 0 24 24">
                            <path 
                            fill="currentColor" 
                            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" 
                            onClick={() => {this.likeOrDislike(true, this.state.id, "NULL USER")}}/>
                        </svg>
                        <h2> {this.state.likes.length}</h2>
                    </div>
                    <div className="dislike-info">
                        <svg 
                        style={{width: "24px", height: "24px"}} 
                        viewBox="0 0 24 24">
                            <path fill="currentColor" 
                            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C8.17,3 8.82,3.12 9.44,3.33L13,9.35L9,14.35L12,21.35V21.35M16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35L11,14.35L15.5,9.35L12.85,4.27C13.87,3.47 15.17,3 16.5,3Z" 
                            onClick={() => {this.likeOrDislike(false, this.state.id, "NULL USER")}}/>
                        </svg>
                        <h2> {this.state.dislikes.length}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;