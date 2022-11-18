import React from "react";
import { ReactDOM } from "react";
import '../Stylesheets/userinfo.css';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.location.pathname.split("/").pop(),
            bio: this.props.userinfo.bio,
        };
    }

    /* TODO: get bio from backend */
    render() {
        return (
            <div className="UserInfo">
                <h1> @{this.state.user}</h1>
                <h2></h2>
                <p> {this.state.bio} </p>
            </div>
        );
    }
}

export default UserInfo;