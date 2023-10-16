import { useLocation } from "react-router-dom";
import '../Stylesheets/userinfo.css';

function UserInfo(props) {
    const location = useLocation();

    /* TODO: Include a follower count (just display the length of this.props.userinfo.a_followers) */
    return (
        <div className="UserInfo">
            <h1> @{location.pathname.split("/").pop()}</h1>
            <h2></h2>
            <h3> {props.followers.length} followers </h3>
            <h2></h2>
            <p> {props.bio} </p>
        </div>
    );

}

export default UserInfo;