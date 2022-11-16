import React from "react";

class PostDisplay extends React.Component {
    // Pass in (optional) username for props - if there is a username, show all posts from users that they follow
    // If there is no username, then show every single post
    constructor(props) {
        super(props);
        this.state = {
            postIDS: null
        };
    }

    async componentDidMount() {
        if (this.props.user)
        {
            // Need GET user route for this one
            let response = await fetch(`http://localhost:8080/users/${this.props.user}`);
            response = await response.json();
        }
    }

    render() {
        return (
            <div className="PostDisplay">

            </div>
        );
    }
}

export default PostDisplay;