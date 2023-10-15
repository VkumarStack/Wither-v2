import React from "react";
import '../Stylesheets/follow.css';

class Follow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.getItem("user"),
            errorMessage: false
        };
    }

    async handleSubmit(e) {
        if (this.state.user === null)
            return;
        e.preventDefault();
        let response = await fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + `/users/${this.props.current}/follow`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({username: this.state.user, followers: this.props.current})
        })
        response = await response.json();
        if (response.Error)
        {
            // If the user is logged in but their sign in token is bad (sign in token expires after 2 hours), log them out and reload the page
            if (response.TokenError)
            {
                sessionStorage.clear();
                window.location.reload(true);
            }
            else 
            {
                // do not post 
                this.setState({errorMessage: response.Error});
                setTimeout(() => {this.setState({errorMessage: null})}, 20000);
            }
        }
        else
        {
            // This is altering the parent component's (Profile) state, which causes it to re-render the UserInfo 
            // component with the new follower
            this.props.updateFollow(response.followers);
        }
    }

    checkFollowed() {
        if (this.props.followers === null)
            return;
        if (this.props.followers.includes(this.state.user))
            return "Unfollow";
        return "Follow";
    }

    render() {
        return (
            <div className="Follow">
                <div className="follow-button" onClick={(e) => this.handleSubmit(e)}> { this.checkFollowed() } 
                </div>
                    {   (this.state.errorMessage !== null) &&
                        <h1> {this.state.errorMessage} </h1>
                    }
            </div>
        );
    }
}
export default Follow;