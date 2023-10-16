import React from "react";
import Post from "./Post";
import "../Stylesheets/postdisplay.css";

class PostDisplay extends React.Component {
    // Pass in (optional) username for props - if there is a username, show all posts from users that they follow
    // If there is no username, then show every single post
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        this.getPosts();
    }

    componentDidUpdate(prevProps) {
        let newUsernames = false;
        if ((this.props.usernames && !prevProps.usernames) || (!this.props.usernames && prevProps.usernames)) {
            newUsernames = true;
        } else if (this.props.usernames && prevProps.usernames) {
            if (this.props.usernames.length !== prevProps.usernames.length) {
                newUsernames = true;
            } else {
                for (let i = 0; i < this.props.usernames.length; i++) {
                    if (this.props.usernames[i] !== prevProps.usernames[i]) {
                        newUsernames = true;
                    }
                }
            }
        }

        if (newUsernames) {
            this.setState({posts: []});
            this.getPosts();
        }
    }

    async getPosts() {
        let usernamePattern = "";
        if (this.props.usernames && this.props.usernames.length > 0) {
            const groups = this.props.usernames.map((name) => `(^${name}$)`)
            usernamePattern = groups.join("|")
        }
        let posts = await fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + `/posts?pattern=${usernamePattern}`)
        posts = await posts.json();
        this.setState({posts: posts.posts});
    }

    generatePosts() {
        if (this.state.posts.length === 0)
            return;
        
        const posts = this.state.posts.map((post) => <Post post={post} key={post._id}/>)

        return posts;
        
    }

    render() {
        this.generatePosts();
        return (
            <div className="PostDisplay">
                { this.generatePosts()}
            </div>
        );
    }
}

export default PostDisplay;