import React from "react";
import { ReactDOM } from "react";
import '../Stylesheets/userinfo.css';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.location.pathname.split("/").pop(),
        }
    }

    /* TODO: Include a follower count (just display the length of this.props.userinfo.a_followers) */
    render() {
        return (
            <div className="UserInfo">
                <h1> @{this.state.user}</h1>
                <h2></h2>
                <p> {this.props.bio} </p>
            </div>
        );
    }
}

export default UserInfo;